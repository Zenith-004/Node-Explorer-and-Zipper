const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const archiver = require('archiver');
const fs = require('fs');
const { promisify } = require('util');
const streamPipeline = promisify(require('stream').pipeline);

function setupServer(APACHE_URL) {
    const app = express();
    const port = 4000;

    // Set EJS as the templating engine
    app.set('view engine', 'ejs');

    // Set static folder for public assets
    app.use(express.static(path.join(__dirname, 'public')));

    // Simple logging middleware to debug requests
    app.use((req, res, next) => {
        console.log(`Request for ${req.url}`);
        next();
    });

    // Function to fetch files and directories
    async function fetchFiles(url) {
        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            const items = [];

            $('a').each((index, element) => {
                const href = $(element).attr('href');
                if (href && href !== '../') {
                    const isDirectory = href.endsWith('/');
                    items.push({
                        name: $(element).text(),
                        url: url + href,
                        type: isDirectory ? 'directory' : 'file'
                    });
                }
            });
            return items;
        } catch (error) {
            console.error('Error fetching files:', error);
            return [];
        }
    }

    // Function to download files and directories
    async function downloadFiles(baseUrl, dirPath) {
        const items = await fetchFiles(baseUrl);

        for (const item of items) {
            if (item.type === 'directory') {
                const newDirPath = path.join(dirPath, item.name);
                fs.mkdirSync(newDirPath, { recursive: true });
                await downloadFiles(item.url, newDirPath);
            } else {
                const filePath = path.join(dirPath, item.name);
                const writer = fs.createWriteStream(filePath);
                const response = await axios({
                    url: item.url,
                    method: 'GET',
                    responseType: 'stream'
                });
                await streamPipeline(response.data, writer);
            }
        }
    }

    // Home route to list files
    app.get('/', async (req, res) => {
        const files = await fetchFiles(APACHE_URL);
        res.render('index', { files, baseUrl: APACHE_URL });
    });

    // Route to download folders
    app.get('/download', async (req, res) => {
        const folderUrl = req.query.url;
        const folderName = path.basename(folderUrl);
        const tempDir = path.join(__dirname, 'temp', folderName);

        try {
            // Ensure the temp directory exists
            fs.mkdirSync(tempDir, { recursive: true });

            // Download files to the temp directory
            await downloadFiles(folderUrl, tempDir);

            // Create a zip file of the folder
            const zipPath = path.join(__dirname, 'temp', `${folderName}.zip`);
            const output = fs.createWriteStream(zipPath);
            const archive = archiver('zip', { zlib: { level: 9 } });

            // Listen for errors on the archive
            archive.on('error', (err) => {
                throw err;
            });

            output.on('close', () => {
                // Send the zip file
                res.download(zipPath, `${folderName}.zip`, (err) => {
                    if (err) {
                        console.error('Error downloading file:', err);
                    }

                    // Clean up: remove the temporary files
                    fs.rmSync(tempDir, { recursive: true, force: true });
                    fs.unlinkSync(zipPath);
                });
            });

            // Pipe archive data to the output file
            archive.pipe(output);
            archive.directory(tempDir, false);
            await archive.finalize();
        } catch (error) {
            console.error('Error creating zip file:', error);
            res.status(500).send('Failed to create ZIP file.');
        }
    });

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

// Usage: Call setupServer with your APACHE_URL
const APACHE_URL = 'http://127.0.0.1/uploads/folder2/';
setupServer(APACHE_URL);

// Export setupServer function if needed
module.exports = setupServer;
