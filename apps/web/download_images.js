const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
    { url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80", dest: "src/assets/journey_perinatal_gen.jpg" },
    { url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80", dest: "src/assets/journey_prevention_gen.jpg" },
    { url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80", dest: "src/assets/journey_diabetes_gen.jpg" },
    { url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80", dest: "src/assets/journey_bone_gen.jpg" }
];

const downloadImage = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => {
                    console.log(`Downloaded: ${dest}`);
                    resolve();
                });
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
};

(async () => {
    try {
        const assetsDir = path.join(__dirname, 'src', 'assets');
        if (!fs.existsSync(assetsDir)) {
            fs.mkdirSync(assetsDir, { recursive: true });
        }

        for (const img of images) {
            await downloadImage(img.url, path.join(__dirname, img.dest));
        }
        console.log('All images downloaded successfully.');
    } catch (error) {
        console.error('Error downloading images:', error);
        process.exit(1);
    }
})();
