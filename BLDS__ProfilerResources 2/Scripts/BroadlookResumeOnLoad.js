if (typeof (Broadlook) == "undefined")
{ Broadlook = { __namespace: true }; }

Broadlook.ResumeCapture = {

    onload: function (executioncontext) {


        //var context = executioncontext.getContext();

        //alert('load');


        var status = Xrm.Page.getAttribute("statuscode").getValue();

        //check if "new"
        if (status == 1) {
            //var fullname = Xrm.Page.getAttribute("blt_fullname").getValue();

            var sourcetype = Xrm.Page.getAttribute("blt_sourcetype").getValue();

            if (sourcetype == 858880002)
                Broadlook.ResumeCapture.saveAndBrowse();
            else if (sourcetype == 858880001)
                Broadlook.ResumeCapture.capture();
        }

    },


    onsave: function (executioncontext) {

        //alert('save');

    },

    saveAndBrowse: function () {

        //Xrm.Page.data.entity.save();
        //Xrm.Page.ui.tabs.get(0).setVisible(false);
        //Xrm.Page.getControl("notescontrol").setFocus(true);
        //document.getElementById("EntityTemplateTab.blt_resume.NoRelationship.Form.Mscrm.Form.blt_resume.Related-title").getElementsByTagName("a")[0].click();
        //Xrm.Page.getControl("notescontrol")._control.get_innerControl()


        var id = Xrm.Page.data.entity.getId();
        var typecode = Xrm.Page.context.getQueryStringParameters()["etc"];


        var name = Xrm.Page.getAttribute("blt_fullname");
        //name.setValue('');
        //Xrm.Page.data.entity.save();

        //var objNavItem = Xrm.Page.ui.navigation.items.get("navContacts");
        //objNavItem.setVisible(false);

        var status = Xrm.Page.getAttribute("statuscode");
        status.setValue(858880000);


        Mscrm.RibbonActions.addFileToRecord(typecode, id);

        //alert('save');

    },

    capture: function () {


        //var name = Xrm.Page.getAttribute("blt_fullname");
        //name.setValue('');

        var status = Xrm.Page.getAttribute("statuscode");
        status.setValue(858880000);

        try {

            setTimeout("Xrm.Page.data.entity.save();", 2000);

        } catch (err) {
            var t = [];
            for (var e in err)
                t.push(e + ': ' + err[e]);
            alert("Error 2" + t.join('\n'));
        }
    },

    hideShowSection: function (tabName, sectionName, visible) {
        Xrm.Page.ui.tabs.get(tabName).sections.get(sectionName).setVisible(visible);
    },


    __namespace: true
};