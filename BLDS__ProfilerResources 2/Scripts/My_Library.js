/// <reference path="XrmPageTemplate.js" />

//This Library uses a unique function naming strategy to help prevent duplication function names.
// Each of your function names should include a consistent prefix to help make them unique.
// Replace 'My_Library' with the prefix you want to use.

//IMPORTANT: This library is not referenced in the TestPage.htm. You need to drag the My_Library.js
// file from the Solution Explorer into the <head> element of the TestPage.htm before you can test scripts
// in this library.


function My_Library_saveRecordExampleFunction() {
 Xrm.Page.data.entity.save();
}

function My_Library_closeFormExampleFunction() {
 Xrm.Page.ui.close();
}

