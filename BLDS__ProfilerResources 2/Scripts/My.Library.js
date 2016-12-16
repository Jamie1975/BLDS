/// <reference path="XrmPageTemplate.js" />

//This Library uses a namespace naming strategy to help prevent duplication function names
//Replace all 3 instances of 'My' with the namespace string you want to use.
if (typeof (My) == "undefined")
{My = { __namespace: true }; }
// Namespace container for functions in this library.
// Change 'Library' to the container name you want to use.
My.Library = {
	saveRecordExampleFunction: function ()
	{
		Xrm.Page.data.entity.save();
	},
	closeFormExampleFunction: function ()
	{
	 Xrm.Page.ui.close();
	},
	__namespace: true
};
