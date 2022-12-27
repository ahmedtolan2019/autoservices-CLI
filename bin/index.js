#!/usr/bin/env node

import yargs from "yargs";
import fs from "fs";
import { columns } from "./templates/datatable/columns.js";
import { capFirst } from "./utils/capFirst.js";
import { dashedToCamelCase } from "./utils/dashedToCamelCase.js";
import { url } from "inspector";
import { data } from "./templates/datatable/data.js";
import { actions } from "./templates/datatable/actions.js";
import { editable } from "./templates/datatable/editable.js";
import { cellEditable } from "./templates/datatable/celleditable.js";
import { wrapper } from "./templates/datatable/wrapper.js";
import { dataTable } from "./templates/datatable/dataTable.js";
import { dateModel } from "./templates/datatable/contexts/useDateModal.js";
import { useDataTable } from "./templates/datatable/contexts/useDataTable.js";
import { RangeDatePicker } from "./templates/datatable/components/RangeDatePicker.js";
import { Toolbar } from "./templates/datatable/components/Toolbar.js";
import { options } from "./templates/datatable/options.js";
import { components } from "./templates/datatable/components/components.js";
import { screen } from "./templates/screens/screen/index.js";
import { dashedToSpace } from "./utils/dashedToSpace.js";
import { addFeature } from "./templates/features/add.js";
import { addForm } from "./templates/formComponent/AddForm.js";
import path from "path";
import { editFeature } from "./templates/features/edit.js";
import { editForm } from "./templates/formComponent/EditForm/form.js";
import { editFormWrapper } from "./templates/formComponent/EditForm/formWrapper.js";
import { constants } from "./templates/datatable/constants.js";
import { useReports } from "./templates/datatable/hooks/useReports.js";
import { useInitialFilters } from "./templates/datatable/hooks/useInitialFilters.js";

console.log("================= AUTO SERVICES CLI =================");
// console.log(yargs(process.argv).argv);
let inputs = yargs(process.argv).argv;
// console.log(inputs);

// console.log(dashedToCamelCase(inputs.name));
// console.log(capFirst(dashedToCamelCase(inputs.name)));
// console.log(columns(inputs.name));
// console.log(data(inputs.name));

let formatedName = capFirst(dashedToCamelCase(inputs.name));
let docs = [
  { name: "wrapper.jsx", type: "file", content: wrapper(inputs.name) },
  { name: "constants.jsx", type: "file", content: constants(inputs.name) },
  {
    name: `${formatedName}DataTable.jsx`,
    type: "file",
    content: dataTable(inputs.name),
  },

  {
    name: "hooks",
    type: "folder",
    content: [
      {
        name: "useReports.jsx",
        type: "file",
        content: useReports(inputs.name),
      },
      {
        name: "useInitialFilters.jsx",
        type: "file",
        content: useInitialFilters(inputs.name),
      },
    ],
  },

  {
    name: "contexts",
    type: "folder",
    content: [
      {
        name: `use${formatedName}DataTable.jsx`,
        type: "file",
        content: useDataTable(inputs.name),
      },
    ],
  },

  {
    name: "components",
    type: "folder",
    content: [
      {
        name: "Toolbar.jsx",
        type: "file",
        content: Toolbar(inputs.name),
      },
    ],
  },

  {
    name: "helpers",
    type: "folder",
    content: [
      {
        name: `use${formatedName}Data.jsx`,
        type: "file",
        content: data(inputs.name, inputs.dataUrl),
      },
      {
        name: `use${formatedName}Actions.jsx`,
        type: "file",
        content: actions(inputs.name),
      },
      {
        name: `use${formatedName}Editable.jsx`,
        type: "file",
        content: editable(inputs.name, inputs.deleteUrl),
      },
      {
        name: `use${formatedName}CellEditable.jsx`,
        type: "file",
        content: cellEditable(inputs.name),
      },
      {
        name: `use${formatedName}Columns.jsx`,
        type: "file",
        content: columns(inputs.name),
      },
      {
        name: `use${formatedName}Options.jsx`,
        type: "file",
        content: options(inputs.name),
      },
      {
        name: `use${formatedName}Components.jsx`,
        type: "file",
        content: components(inputs.name),
      },
    ],
  },
];

// console.log(`${process.cwd()}`);

// const createFileTest = (filename, content) =>
//   fs.promises.writeFile(`${process.cwd()}\\${filename}`, content);

// createFileTest("fileName", "console.log('test')").then((file) =>
//   console.log("succes")
// );

const getBaseDir = () => {
  if (inputs.path) {
    return `${process.cwd()}\\${inputs.path}`;
  }

  return `${process.cwd()}\\`;
};

const createFile = (filename, content) =>
  fs.promises.writeFile(`${getBaseDir()}${filename}`, content);

const createDir = (dirname, config = {}) =>
  fs.promises.mkdir(`${getBaseDir()}${dirname}`, config);

// data table
if (inputs["data-table"]) {
  (async () => {
    try {
      let dataTableName = dashedToCamelCase(inputs.name);
      //create main table folder
      await createDir(`${dataTableName}`, { recursive: true });

      //create all folders and files inside of this main folder
      for (let doc of docs) {
        if (doc.type === "folder") {
          await createDir(`${dataTableName}\\${doc.name}`, { recursive: true });

          //create files inside
          for (let file of doc.content) {
            await createFile(
              `${dataTableName}\\${doc.name}\\${file.name}`,
              file.content
            );
          }
        } else {
          await createFile(`${dataTableName}\\${doc.name}`, doc.content);
        }
      }
    } catch (error) {
      console.log(error);
    }
  })();
}

//add route
//read file constet
const createRoute = (routePath, elementName, elementPath, parentElementName) =>
  fs.promises
    .readFile("src\\routes.jsx", {
      encoding: "utf-8",
    })
    .then((data) => {
      let newData = data.replace(
        "//cli-imported-routes",
        `//cli-imported-routes\nimport ${elementName} from '${elementPath}';`
      );

      fs.promises.writeFile("src\\routes.jsx", newData).then((data) => {
        fs.promises
          .readFile("src\\routes.jsx", {
            encoding: "utf-8",
          })
          .then((data) => {
            let newData = data;
            if (parentElementName) {
              newData = data.replace(
                `//${parentElementName} childern`,
                `//${parentElementName} childern\n{
                  path: "${routePath}",                  
                  children: [
                    //${elementName} childern
                    {
                      index: true,
                      element: <${elementName} />,
                    }
                  ]
                },`
              );
            } else {
              newData = data.replace(
                `//dashboard-admin-childern`,
                `//dashboard-admin-childern\n{
                  path: "${routePath}",
                  children: [
                    //${elementName} childern
                    { index:true, element: <${elementName} /> },
                  ],
                },`
              );
            }

            fs.promises.writeFile("src\\routes.jsx", newData).then((data) => {
              console.log("succes adding new route, try visit it! :)");
            });
          });
      });
    });

//add route to sidebar with icon
const createSidebarRoute = (
  href,
  title,
  iconName,
  iconPath,
  beforePosition
) => {
  let filePath = "src\\components\\admin-dashboard\\DashboardSidebar.jsx";
  console.log(filePath);
  fs.promises
    .readFile(filePath, {
      encoding: "utf-8",
    })
    .then((data) => {
      let newData = data;
      //add import icon
      let newDataWithImport = newData.replace(
        `//cli-imported-icons`,
        `//cli-imported-icons\nimport ${iconName} from '${iconPath}';`
      );
      //add route to sidebar
      let finalData = newDataWithImport.replace(
        `//${beforePosition}`,
        `
                //${href}
                {
                    href: "/admin/${
                      inputs["parent-screen"]
                        ? `${beforePosition}/${href}`
                        : href
                    }",
                    title: "${title}",
                    icon: ${iconName}
                },

                //${beforePosition}`
      );

      //write to file
      fs.promises.writeFile(filePath, finalData).then((data) => {
        console.log("succes adding new route to sidebar, try visit it! :)");
      });
    });
};

console.log(process.cwd());
//screens and routes
if (inputs["screen"]) {
  (async () => {
    try {
      //create screen dir in screens folder
      let screenDir = `src\\screens\\${capFirst(
        dashedToCamelCase(inputs.name)
      )}`;

      let screenElementPath = `src/screens/${capFirst(
        dashedToCamelCase(inputs.name)
      )}`;

      if (inputs["parent-screen"]) {
        screenDir = `src\\screens\\${capFirst(
          dashedToCamelCase(inputs["parent-screen"])
        )}\\screens\\${capFirst(dashedToCamelCase(inputs.name))}`;

        screenElementPath = `src/screens/${capFirst(
          dashedToCamelCase(inputs["parent-screen"])
        )}/screens/${capFirst(dashedToCamelCase(inputs.name))}`;
      }
      await createDir(screenDir, { recursive: true });
      await createDir(`${screenDir}\\screens`, { recursive: true });

      //create index with returned content from screen
      await createFile(`${screenDir}\\index.jsx`, screen(inputs.name));

      //create route for this screen
      let parentNameArr = inputs["parent-screen"]
        ? inputs["parent-screen"].split("//")
        : [];
      let parentName = "";
      //for 2 levels of childeren
      if (parentNameArr.length === 4) {
        parentName = parentNameArr[2];
        screenElementPath = `src/screens/${capFirst(
          dashedToCamelCase(parentNameArr[0])
        )}/screens/${capFirst(
          dashedToCamelCase(parentNameArr[2])
        )}/screens/${capFirst(dashedToCamelCase(inputs.name))}`;
      } else if (parentNameArr.length === 1) {
        parentName = parentNameArr[0];
      } else {
        parentName = null;
      }
      createRoute(
        `${inputs["route-path"] ?? inputs.name}`,
        `${capFirst(dashedToCamelCase(inputs.name))}Screen`,
        `${screenElementPath}`,
        inputs["parent-screen"]
          ? `${capFirst(dashedToCamelCase(parentName))}Screen`
          : null
      );

      //create sidebar route for this screen
      if (inputs.sidebar) {
        createSidebarRoute(
          `${inputs["route-path"] ?? inputs.name}`,
          `${
            dashedToSpace(inputs.t) ?? capFirst(dashedToCamelCase(inputs.name))
          }`,
          `${inputs.iName}`,
          `${inputs.iPath}`,
          `${inputs.bfrpos}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  })();
}

//forms
if (inputs["form"]) {
  (async () => {
    try {
      let parentComponentDir = `src\\components\\${dashedToCamelCase(
        inputs["parent"]
      )}`;
      let parentFeatureDir = `src\\features\\${dashedToCamelCase(
        inputs["parent"]
      )}`;

      if (inputs["type"] === "add") {
        //create feature file
        await createFile(
          parentFeatureDir +
            "\\" +
            `useAdd${capFirst(dashedToCamelCase(inputs.name))}.jsx`,
          addFeature(inputs.name, inputs["add-url"])
        );

        //create form folder

        await createDir(
          `${parentComponentDir}\\Add${capFirst(
            dashedToCamelCase(inputs.name)
          )}Form`,
          {
            recursive: true,
          }
        );

        //create form file
        await createFile(
          `${parentComponentDir}\\Add${capFirst(
            dashedToCamelCase(inputs.name)
          )}Form\\index.jsx`,
          addForm(inputs.name)
        );
      }

      if (inputs["type"] === "edit") {
        //create feature file
        await createFile(
          parentFeatureDir +
            "\\" +
            `useEdit${capFirst(dashedToCamelCase(inputs.name))}.jsx`,
          editFeature(inputs.name, inputs["edit-url"], inputs["get-one-url"])
        );

        //create form folder

        await createDir(
          `${parentComponentDir}\\Edit${capFirst(
            dashedToCamelCase(inputs.name)
          )}Form`,
          {
            recursive: true,
          }
        );

        //create edit form  file
        await createFile(
          `${parentComponentDir}\\Edit${capFirst(
            dashedToCamelCase(inputs.name)
          )}Form\\EditForm.jsx`,
          editForm(inputs.name)
        );
        //create edit form Wrapper file
        await createFile(
          `${parentComponentDir}\\Edit${capFirst(
            dashedToCamelCase(inputs.name)
          )}Form\\index.jsx`,
          editFormWrapper(inputs.name)
        );
      }
    } catch (error) {
      console.log(error);
    }
  })();
}
