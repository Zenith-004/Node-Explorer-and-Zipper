# 📂 Node Explorer & Zipper 🌟

Welcome to **Node Explorer & Zipper**! This isn't just your ordinary file explorer—it's your personal file fetcher and zipper extraordinaire! 🕵️‍♂️🎒

## What Is This? 🤔

Ever dreamed of navigating your Apache server like a pro and downloading folders as slick ZIP files? Well, dream no more! This project makes your server browsing and downloading tasks a breeze. 🚀

### Key Features 💡

- **Browse Like a Boss:** 🌐 Navigate through your files and directories hosted on an Apache server with ease.
- **ZIP It Up:** 📦 Download entire directories as neatly zipped files, ready to be unpacked.
- **Keep It Organized:** 🗂️ Maintain the directory structure while downloading.
- **Easy on the Eyes:** 👀 Enjoy dynamically rendered pages with EJS templates.
- **Speedy Gonzales:** ⚡ Uses `axios` for swift HTTP requests and `archiver` to zip faster than you can say "abracadabra."

## Getting Started 🏁

### Installation Guide

1. **Clone this Repo:** 🧑‍💻
   ```bash
   git clone https://github.com/Zenith-004/Node-Explorer-and-Zipper.git
   cd node-explorer-zipper
   ```

2. **Install Dependencies:** 📦
   ```bash
   npm install express axios cheerio archiver ejs
   ```

3. **Set Your Apache URL:** 🌐
   Edit `app.js` and replace `APACHE_URL` with your Apache server directory URL.

4. **Fire Up the Server:** 🚀
   ```bash
   node app.js
   ```

5. **Explore & Download:** 🧭 Open your browser and visit [http://localhost:4000](http://localhost:4000).

### Fun Things You Can Do 🎉

- **Navigate Directories:** 🧭 The home page lists files and folders from your specified Apache URL. Click away!
- **ZIP-Download a Folder:** 💾 Visit `/download` with a folder URL to get a ZIP file. Example: `http://localhost:4000/download?url=http://127.0.0.1/uploads/folder2/`.

### Project Layout 🗂️

Here's the lay of the land:

- **`app.js`**: The mastermind behind it all.
- **`public/`**: Static assets, because who doesn’t love a good logo?
- **`views/`**: EJS templates for making things look pretty.
- **`temp/`**: Temporary storage, like a holding cell for your files before zipping.

### Tech Stack 🛠️

- **[Express](https://expressjs.com/)**: The web framework that does it all.
- **[Axios](https://axios-http.com/)**: Making HTTP requests so you don’t have to.
- **[Cheerio](https://cheerio.js.org/)**: jQuery for the server-side, because who said you can’t?
- **[Archiver](https://www.archiverjs.com/)**: Your trusty ZIP creation tool.
- **[EJS](https://ejs.co/)**: For those snazzy templates.

## Contribution Guidelines 🤝

Feel like adding a sprinkle of magic? Contributions are welcome! Just fork this repo, make your changes, and send a pull request. 🧙‍♀️✨

## License 📜

This masterpiece is licensed under the MIT License, so go ahead and make it yours! 🍀

---

**P.S.** Don’t forget to ⭐ this repo if you love it as much as we do! 😄

---

Enjoy exploring and zipping! 🗃️🔄🎉
