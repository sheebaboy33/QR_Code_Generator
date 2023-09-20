import inquirer from 'inquirer'; // Used to get user input
import qr from "qr-image"; // Used to generate the qr-code image
import fs from "fs"; // Used to work with files

inquirer
    .prompt([{
        message: "Type in your URL",
        name: "URL",
    }])
    .then((answers) => {
      // Gets hold of the URL from the answers object
        const url = answers.URL;
        
        //Generated the qe image using the input given by the user
        var qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream('qr_img.png'));


        // Writing to the file the name of the url that was generated
        fs.writeFile('URL.txt', url, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
      }); 
  })
  .catch((error) => {
    if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment");
    } else {
        console.log("Something else went wrong");
    }
  });
