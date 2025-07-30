import faviconPkg from '@realfavicongenerator/generate-favicon';
import imageAdapterPkg from "@realfavicongenerator/image-adapter-node";

const { FaviconSettings, MasterIcon, generateFaviconFiles, generateFaviconHtml, IconTransformationType } = faviconPkg;
const { getNodeImageAdapter, loadAndConvertToSvg } = imageAdapterPkg;
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

async function generateFavicons() {
  console.log('Generating favicons with RealFaviconGenerator...');
  
  const imageAdapter = await getNodeImageAdapter();

  // This is the icon that will be transformed into the various favicon files
  const masterIcon = {
    icon: await loadAndConvertToSvg("public/images/silbenteppich-generator.svg"),
    // Optional: dark version falls back to regular icon if not provided
    // darkIcon: await loadAndConvertToSvg("public/images/silbenteppich-generator-dark.svg"),
  };

  const faviconSettings = {
    icon: {
      desktop: {
        regularIconTransformation: {
          type: IconTransformationType.None,
        },
        darkIconType: "specific",
        darkIconTransformation: {
          type: IconTransformationType.None,
        },
      },
      touch: {
        transformation: {
          type: IconTransformationType.Background,
          backgroundColor: "#ffffff",
          backgroundRadius: 0,
          imageScale: 0.8,
        },
        appTitle: "Silbenteppich"
      },
      webAppManifest: {
        transformation: {
          type: IconTransformationType.None,
        },
        backgroundColor: "#ffffff",
        themeColor: "#3b82f6",
        name: "Silbenteppich-Generator",
        shortName: "Silbenteppich"
      }
    },
    path: "/",
  };

  try {
    // Generate files
    console.log('Generating favicon files...');
    const files = await generateFaviconFiles(masterIcon, faviconSettings, imageAdapter);
    
    // Create output directory
    const outputDir = 'public';
    mkdirSync(outputDir, { recursive: true });
    
    // Save all generated files
    let savedCount = 0;
    for (const [fileName, fileContent] of Object.entries(files)) {
      const filePath = join(outputDir, fileName);
      
      // Create directory if needed
      mkdirSync(dirname(filePath), { recursive: true });
      
      if (fileContent instanceof Uint8Array) {
        writeFileSync(filePath, fileContent);
      } else {
        writeFileSync(filePath, fileContent, 'utf8');
      }
      
      console.log(`  ${fileName}`);
      savedCount++;
    }

    // Generate HTML
    console.log('Generating HTML markups...');
    const html = await generateFaviconHtml(faviconSettings);
    
    // Save HTML to a file for easy copy-paste
    const htmlContent = typeof html === 'string' ? html : JSON.stringify(html, null, 2);
    writeFileSync('favicon-html.txt', htmlContent);
    console.log('  favicon-html.txt (copy this to your index.html <head>)');

    console.log(`\nSuccess! Generated ${savedCount} favicon files.`);
    console.log(`\nNext steps:`);
    console.log(`1. Copy the content of 'favicon-html.txt' to your index.html <head> section`);
    console.log(`2. Replace the current favicon link in index.html`);
    console.log(`3. Test with: npm run dev`);

  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();