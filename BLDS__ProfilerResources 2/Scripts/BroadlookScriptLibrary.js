if (typeof (Broadlook) == "undefined")
{ Broadlook = { __namespace: true }; }

Broadlook.Metadata = {

    __initialized: false,

    Workflows: {

        ConvertProfilerLeadToNewCrmLead: '{3D1E0721-5911-4A12-813A-7BC5BD62D1E5}',
        ConvertProfilerLeadToNewCrmContact: '{7A317D6C-1E22-41F8-993D-C7A7AB98443E}',
        ConvertProfilerLeadToNewCrmContactAndNewCrmAccount: '{49584b61-2fe8-45b7-953d-e800a8e827e5}',

        ConvertCaptureContactToNewCrmLead: '{35932436-B9BA-4A37-9BA1-7E707A380762}',
        ConvertCaptureContactToNewCrmContact: '{4ec12fea-4458-49c5-9426-1a9236641a05}',
        ConvertCaptureContactToNewCrmContactAndNewCrmAccount: '{77c2628b-7655-40a6-a27e-1552dceb1833}',

        ProfileProfilerCompany: '{23CAC504-6848-44E1-9D11-75188F41E1E6}',

        UpdateCrmContact: '{02d35286-e9f6-4e3f-b7a9-64453ecfda2a}',

        __namespace: true
    },

    Entities: {

        ProfilerLead: {
            EntityTypeCode: '10006',
            Name: "blt_profilerlead"

        },

        ProfilerCompany: {
            EntityTypeCode: '10003',
            Name: "blt_profilercompany"

        },

        ProfilerPlan: {
            EntityTypeCode: '',
            Name: "blt_profilerplan"

        },

        CaptureRequest: {
            EntityTypeCode: '10010',
            Name: "blt_capturerequest"

        },

        CaptureContact: {
            EntityTypeCode: '10012',
            Name: "blt_capturecontact",
            StatusCodes: {
                New: {
                    Value: 1,
                    Name: "New"
                },
                Exported: {
                    Value: 858880000,
                    Name: "Exported"
                }
            }
        },


        Resume: {
            EntityTypeCode: '10000',
            Name: "blt_resume",
            StatusCodes: {
                New: {
                    Value: 1,
                    Name: "New"
                },
                Exported: {
                    Value: 858880000,
                    Name: "Exported"
                }
            },
            SourceTypes: {
                Manual: {
                    Value: 858880000,
                    Name: "Manual"
                },
                Text: {
                    Value: 858880001,
                    Name: "Text"
                },
                File: {
                    Value: 858880002,
                    Name: "File"
                },
                Email: {
                    Value: 858880003,
                    Name: "Email Attachement"
                }
            }

        },

        __namespace: true
    },

    //*********************************************************
    getEntityProperty: function (entity, property) {

        var request = "<Request xsi:type='RetrieveEntityRequest'>" +
 "<EntityItems>EntityOnly</EntityItems>" +       //EntityItems – The items we wish to retrieve e.g. EntityOnly, IncludeAttributes, IncludePrivileges, IncludeRelationships and All.
 "<RetrieveAsIfPublished>true</RetrieveAsIfPublished>" +    //RetrieveAsIfPublished – specifies whether you want to get a list of just the published entity metadata or all of the entity metadata.
 "<LogicalName>" + entity + "</LogicalName>" +      //Logicalname of the entity
 "</Request>";

        var result = Broadlook.Metadata.queryMetadataService(request);
        var displayNames = result.selectNodes("//EntityMetadata/DisplayName/LocLabels/LocLabel/Label");
        var schemaNames = result.selectNodes("//EntityMetadata/" + property);
        for (var i = 0; i < schemaNames.length; i++) {
            if (result.selectNodes("//EntityMetadata/SchemaName")[i].text.toLowerCase() == entity) {
                if (property.toLowerCase() == 'displayname') {
                    return displayNames[i].text
                } else {
                    return schemaNames[i].text;
                }
            }
        }
    },

    queryMetadataService: function (request) {

        var xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        xmlhttp.open("POST", '/mscrmservices/2007/MetadataService.asmx', false);
        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
        xmlhttp.setRequestHeader("SOAPAction", 'http://schemas.microsoft.com/crm/2007/WebServices/Execute');
        var soapMessage = "<?xml version='1.0' encoding='utf-8'?>" +
 "<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' " +
 "xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>" +
 "<soap:Header>" +
 "<CrmAuthenticationToken xmlns='http://schemas.microsoft.com/crm/2007/WebServices'>" +
 "<AuthenticationType xmlns='http://schemas.microsoft.com/crm/2007/CoreTypes'>" + AUTHENTICATION_TYPE + "</AuthenticationType>" +
 "<OrganizationName xmlns='http://schemas.microsoft.com/crm/2007/CoreTypes'>" + ORG_UNIQUE_NAME + "</OrganizationName>" +
 "<CallerId xmlns='http://schemas.microsoft.com/crm/2007/CoreTypes'>00000000-0000-0000-0000-000000000000</CallerId>" +
 "</CrmAuthenticationToken>" +
 "</soap:Header>" +
 "<soap:Body><Execute xmlns='http://schemas.microsoft.com/crm/2007/WebServices'>" + request + "</Execute></soap:Body>" +
 "</soap:Envelope>";
        xmlhttp.send(soapMessage);
        return xmlhttp.responseXML;
    },

    init: function (app) {

        if (this.__initialized) return;

        if (app == 'RC') {
            Broadlook.Metadata.Entities.Resume.EntityTypeCode = Broadlook.Metadata.getEntityProperty(Broadlook.Metadata.Entities.Resume.Name, "ObjectTypeCode");
        }
        else if (app == 'PR') {
            Broadlook.Metadata.Entities.ProfilerLead.EntityTypeCode = Broadlook.Metadata.getEntityProperty(Broadlook.Metadata.Entities.ProfilerLead.Name, "ObjectTypeCode");
            Broadlook.Metadata.Entities.ProfilerCompany.EntityTypeCode = Broadlook.Metadata.getEntityProperty(Broadlook.Metadata.Entities.ProfilerCompany.Name, "ObjectTypeCode");
            Broadlook.Metadata.Entities.ProfilerPlan.EntityTypeCode = Broadlook.Metadata.getEntityProperty(Broadlook.Metadata.Entities.ProfilerPlan.Name, "ObjectTypeCode");
        }
        else if (app == 'CC') {
            Broadlook.Metadata.Entities.CaptureContact.EntityTypeCode = Broadlook.Metadata.getEntityProperty(Broadlook.Metadata.Entities.CaptureContact.Name, "ObjectTypeCode");
            Broadlook.Metadata.Entities.CaptureRequest.EntityTypeCode = Broadlook.Metadata.getEntityProperty(Broadlook.Metadata.Entities.CaptureRequest.Name, "ObjectTypeCode");
        }
        else {
            Broadlook.Metadata.Entities.CaptureContact.EntityTypeCode = Broadlook.Metadata.getEntityProperty(Broadlook.Metadata.Entities.CaptureContact.Name, "ObjectTypeCode");
            Broadlook.Metadata.Entities.CaptureRequest.EntityTypeCode = Broadlook.Metadata.getEntityProperty(Broadlook.Metadata.Entities.CaptureRequest.Name, "ObjectTypeCode");
            Broadlook.Metadata.Entities.ProfilerLead.EntityTypeCode = Broadlook.Metadata.getEntityProperty(Broadlook.Metadata.Entities.ProfilerLead.Name, "ObjectTypeCode");
            Broadlook.Metadata.Entities.ProfilerCompany.EntityTypeCode = Broadlook.Metadata.getEntityProperty(Broadlook.Metadata.Entities.ProfilerCompany.Name, "ObjectTypeCode");
            Broadlook.Metadata.Entities.ProfilerPlan.EntityTypeCode = Broadlook.Metadata.getEntityProperty(Broadlook.Metadata.Entities.ProfilerPlan.Name, "ObjectTypeCode");
            Broadlook.Metadata.Entities.Resume.EntityTypeCode = Broadlook.Metadata.getEntityProperty(Broadlook.Metadata.Entities.Resume.Name, "ObjectTypeCode");
        }

        this.__initialized = true;
    },


    __namespace: true
};

Broadlook.Library = {

    BuildVersion: 55,

    init: function (app) {


        // Set Global Variables
        Broadlook.Library.startTime = new Date();
        Broadlook.Library.demo = false;


        try {

            var context = GetGlobalContext();

            Broadlook.Library.serverUrl = context.getServerUrl();
            if (Broadlook.Library.serverUrl[Broadlook.Library.serverUrl.length - 1] != '/') Broadlook.Library.serverUrl += '/';

            Broadlook.Library.ODataPath = Broadlook.Library.serverUrl + "XRMServices/2011/OrganizationData.svc";
            Broadlook.Library.currentUserId = context.getUserId();

            var queryparams = context.getQueryStringParameters();

            Broadlook.Library.entityId = queryparams["id"];
            Broadlook.Library.entityTypeName = queryparams["typename"];
            Broadlook.Library.entityTypeCode = queryparams["etc"];
            if (!Broadlook.Library.nz(Broadlook.Library.entityTypeCode))
                Broadlook.Library.entityTypeCode = queryparams["typecode"];

        }
        catch (error) {
            Broadlook.Library.demo = true;
            Broadlook.Library.serverUrl = 'https://broadlook.crm.dynamics.com/';
            Broadlook.Library.ODataPath = Broadlook.Library.serverUrl + "XRMServices/2011/OrganizationData.svc";
            Broadlook.Library.currentUserId = "ID3";

        }

        if (!Broadlook.Library.demo)
            Broadlook.Metadata.init(app);
    },




    getXrmPage: function () {

        if (Broadlook.Library.demo) {
            var p = new Object;
            p.data = new Object;
            p.data.entity = new Object;
            p.data.entity.attributes = new Object;

            return p;
        }

        return document.parentWindow.parent.Xrm.Page;
    },

    saveRecord: function () {
        var xrmPage = Broadlook.Library.getXrmPage();

        xrmPage.data.entity.save();
    },

    closeForm: function () {
        var xrmPage = Broadlook.Library.getXrmPage();

        xrmPage.ui.close();
    },

    /******************************************************************************************

    Resume Capture

    ******************************************************************************************/

    createResume: function (Name, callback, text, sourcetype) {

        var resume = new Object();
        resume.blt_fullname = Name;

        if (Broadlook.Library.nz(text))
            resume.blt_resumetext = text;

        if (Broadlook.Library.nz(sourcetype)) {
            resume.blt_sourcetype = new Object;
            resume.blt_sourcetype.Value = sourcetype;
        }


        var jsonObject = window.JSON.stringify(resume);

        var createReq = new XMLHttpRequest();
        createReq.open("POST", Broadlook.Library.ODataPath + "/blt_resumeSet", true);
        createReq.setRequestHeader("Accept", "application/json");
        createReq.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        createReq.onreadystatechange = function () {
            Broadlook.Library.createReqCallBack(this, callback);
        };
        createReq.send(jsonObject);

    },

    retrieveRecentResumes: function (callback) {

        if (Broadlook.Library.demo) {

            var arr = [];

            for (var i = 0; i < 12; i++) {

                var acc = new Object;
                acc.blt_fullname = "Demo Resume " + i;
                acc.blt_resumeId = "ID" + i;

                arr.push(acc);
            }

            var res = new Object;
            res.results = arr;


            if (Broadlook.Library.nz(callback))
                callback(res);

            return;
        }

        var path = Broadlook.Library.ODataPath + "/blt_resumeSet?$select=blt_resumeId,blt_fullname&$orderby=CreatedOn desc&$filter=";

        var req = new XMLHttpRequest();
        req.open("GET", path, true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            Broadlook.Library.retrieveRecordCallBack(this, callback);
        };
        req.send();
    },

    /******************************************************************************************

    CRM User

    ******************************************************************************************/


    retrieveUsers: function (callback) {

        if (Broadlook.Library.demo) {

            var arr = [];

            for (var i = 0; i < 12; i++) {

                var acc = new Object;
                acc.FullName = "Demo User " + i;
                acc.SystemUserId = "ID" + i;

                arr.push(acc);
            }

            var res = new Object;
            res.results = arr;


            if (Broadlook.Library.nz(callback))
                callback(res);

            return;
        }

        var path = Broadlook.Library.ODataPath + "/SystemUserSet?$select=SystemUserId,FullName&$orderby=FullName&$filter=IsDisabled eq false and AccessMode/Value eq 0";

        var req = new XMLHttpRequest();
        req.open("GET", path, true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            Broadlook.Library.retrieveRecordCallBack(this, callback);
        };
        req.send();
    },

    /******************************************************************************************

    CRM Account

    ******************************************************************************************/

    createAccountRecord: function (Name, callback) {

        var account = new Object();
        account.Name = Name;
        var jsonAccount = window.JSON.stringify(account);

        var createAccountReq = new XMLHttpRequest();
        createAccountReq.open("POST", Broadlook.Library.ODataPath + "/AccountSet", true);
        createAccountReq.setRequestHeader("Accept", "application/json");
        createAccountReq.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        createAccountReq.onreadystatechange = function () {
            Broadlook.Library.createAccountReqCallBack(this, callback);
        };
        createAccountReq.send(jsonAccount);

    },

    createAccountReqCallBack: function (createAccountReq, callback) {
        if (createAccountReq.readyState == 4) {
            if (createAccountReq.status == 201) {
                //Success
                var newAccount = JSON.parse(createAccountReq.responseText).d;

                if (typeof (callback) != 'undefined' && callback != null)
                    callback(newAccount.AccountId);

            }
            else {
                //Failure
                Broadlook.Library.errorHandler(createAccountReq);

                if (typeof (callback) != 'undefined' && callback != null)
                    callback(false);
            }
        }
    },

    retrieveAccountRecords: function (searchstring, callback) {

        if (Broadlook.Library.demo) {

            var arr = [];

            for (var i = 0; i < 12; i++) {

                var acc = new Object;
                acc.Name = "Demo Account " + i;
                acc.AccountId = "ID" + i;

                arr.push(acc);
            }

            var res = new Object;
            res.results = arr;

            if (Broadlook.Library.nz(callback))
                callback(res);

            return;
        }

        var req = new XMLHttpRequest();
        var path = Broadlook.Library.ODataPath + "/AccountSet?$filter=substringof('" + escape(searchstring) + "',Name) and StateCode/Value eq 0&$select=Name,AccountId";
        req.open("GET", path, true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            Broadlook.Library.retrieveRecordCallBack(this, callback);
        };
        req.send();

    },


    /******************************************************************************************

    Profiler Lead

    ******************************************************************************************/

    retrievRecords: function (path, callback) {

        if (typeof (path) == "undefined") {
            Broadlook.Library.showMessage("'path' argument is empty");
            if (typeof (callback) != 'undefined' && callback != null)
                callback(false);
            return;
        }

        var req = new XMLHttpRequest();
        req.open("GET", path, true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            Broadlook.Library.retrieveRecordCallBack(this, callback);
        };
        req.send();
    },

    retrieveProfilerLeadRecords: function (path, callback) {

        Broadlook.Library.retrievRecords(path, callback);

        /*if (typeof (path) == "undefined") {
        Broadlook.Library.showMessage("'path' argument is empty");
        callback(false);
        return;
        }

        var req = new XMLHttpRequest();
        req.open("GET", path, true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
        Broadlook.Library.retrieveRecordCallBack(this, callback);
        };
        req.send();*/
    },

    connectProfilerLeadsToCrmAccount: function (Ids, accountid, callback) {

        if (typeof (Ids) == "undefined") {
            Broadlook.Library.showError("Missing parameter - Ids");
            if (typeof (callback) != 'undefined' && callback != null)
                callback(false);
            return;
        }

        if (typeof (accountid) == "undefined") {
            Broadlook.Library.showError("Missing parameter - accountid");
            if (typeof (callback) != 'undefined' && callback != null)
                callback(false);
            return;
        }

        var ids0 = Ids.split(';');
        var ids = [];
        for (var j = 0; j < ids0.length; j++) {
            var id0 = ids0[j];
            if (!Broadlook.Library.nz(id0)) continue;
            id0 = id0.replace('{', '').replace('}', '');
            ids.push(id0);
        }


        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];

            var req = new XMLHttpRequest();

            var changes = new Object();
            changes.blt_crmaccountid = new Object;
            changes.blt_crmaccountid.Id = accountid;
            changes.blt_crmaccountid.LogicalName = 'account';

            var path = Broadlook.Library.ODataPath + "/blt_profilerleadSet(guid'" + id + "')";
            req.open("POST", path, true);
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("X-HTTP-Method", "MERGE");
            req.onreadystatechange = function () {
                Broadlook.Library.updateReqCallBack(this, callback, i >= (ids.length - 1));
            };
            req.send(JSON.stringify(changes));

        }
    },

    assignProfilerLeads: function (Ids, userid, callback) {

        if (Broadlook.Library.demo) {
            if (typeof (callback) != 'undefined' && callback != null)
                callback(true);
            return;
        }

        if (typeof (Ids) == "undefined") {
            Broadlook.Library.showError("Missing parameter - Ids");
            if (typeof (callback) != 'undefined' && callback != null)
                callback(false);
            return;
        }

        if (typeof (userid) == "undefined") {
            Broadlook.Library.showError("Missing parameter - userid");
            if (typeof (callback) != 'undefined' && callback != null)
                callback(false);
            return;
        }

        var ids0 = Ids.split(';');
        var ids = [];
        for (var j = 0; j < ids0.length; j++) {
            var id0 = ids0[j];
            if (!Broadlook.Library.nz(id0)) continue;
            id0 = id0.replace('{', '').replace('}', '');
            ids.push(id0);
        }

        var header = GenerateAuthenticationHeader();
        var target = "TargetOwnedblt_profilerlead";

        for (var i = 0; i < ids.length; i++) {
            var recordid = ids[i];


            var xml = "" +
"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
"<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">" +
header +
"  <soap:Body>" +
"    <Execute xmlns=\"http://schemas.microsoft.com/crm/2007/WebServices\">" +
"      <Request xsi:type=\"AssignRequest\">" +
"        <Target xsi:type=\"" + target + "\">" +
"          <EntityId>" + recordid + "</EntityId>" +
"        </Target>" +
"        <Assignee>" +
"          <PrincipalId xmlns=\"http://schemas.microsoft.com/crm/2006/CoreTypes\">" + userid + "</PrincipalId>" +
"          <Type xmlns=\"http://schemas.microsoft.com/crm/2006/CoreTypes\">User</Type>" +
"        </Assignee>" +
"      </Request>" +
"    </Execute>" +
"  </soap:Body>" +
"</soap:Envelope>" +
"";

            var xmlHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");

            xmlHttpRequest.Open("POST", "/mscrmservices/2007/CrmService.asmx", false);
            xmlHttpRequest.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/crm/2007/WebServices/Execute");
            xmlHttpRequest.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlHttpRequest.setRequestHeader("Content-Length", xml.length);
            xmlHttpRequest.send(xml);

            var res = xmlHttpRequest.responseXML.text === "";

            if (!res) Broadlook.Library.showError("Cannot assign new owner");

            if (i >= (ids.length - 1)) // last iteration
                if (typeof (callback) != 'undefined' && callback != null)
                    callback(res);
        }
    },


    connectCaptureContactsToCrmAccount: function (Ids, accountid, callback) {

        if (typeof (Ids) == "undefined") {
            Broadlook.Library.showError("Missing parameter - Ids");
            callback(false);
            return;
        }

        if (typeof (accountid) == "undefined") {
            Broadlook.Library.showError("Missing parameter - accountid");
            callback(false);
            return;
        }

        var ids0 = Ids.split(';');
        var ids = [];
        for (var j = 0; j < ids0.length; j++) {
            var id0 = ids0[j];
            if (!Broadlook.Library.nz(id0)) continue;
            id0 = id0.replace('{', '').replace('}', '');
            ids.push(id0);
        }


        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];

            var req = new XMLHttpRequest();

            var changes = new Object();
            changes.blt_crmaccountid = new Object;
            changes.blt_crmaccountid.Id = accountid;
            changes.blt_crmaccountid.LogicalName = 'account';

            var path = Broadlook.Library.ODataPath + "/blt_capturecontactSet(guid'" + id + "')";
            req.open("POST", path, true);
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("X-HTTP-Method", "MERGE");
            req.onreadystatechange = function () {
                Broadlook.Library.updateReqCallBack(this, callback, i >= (ids.length - 1));
            };
            req.send(JSON.stringify(changes));

        }
    },

    assignCaptureContacts: function (Ids, userid, callback) {

        if (typeof (Ids) == "undefined") {
            Broadlook.Library.showError("Missing parameter - Ids");
            callback(false);
            return;
        }

        if (typeof (userid) == "undefined") {
            Broadlook.Library.showError("Missing parameter - userid");
            callback(false);
            return;
        }

        var ids0 = Ids.split(';');
        var ids = [];
        for (var j = 0; j < ids0.length; j++) {
            var id0 = ids0[j];
            if (!Broadlook.Library.nz(id0)) continue;
            id0 = id0.replace('{', '').replace('}', '');
            ids.push(id0);
        }

        var header = GenerateAuthenticationHeader();
        var target = "TargetOwnedblt_capturecontact";

        for (var i = 0; i < ids.length; i++) {

            var recordid = ids[i];

            var xml = "" +
"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
"<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">" +
header +
"  <soap:Body>" +
"    <Execute xmlns=\"http://schemas.microsoft.com/crm/2007/WebServices\">" +
"      <Request xsi:type=\"AssignRequest\">" +
"        <Target xsi:type=\"" + target + "\">" +
"          <EntityId>" + recordid + "</EntityId>" +
"        </Target>" +
"        <Assignee>" +
"          <PrincipalId xmlns=\"http://schemas.microsoft.com/crm/2006/CoreTypes\">" + userid + "</PrincipalId>" +
"          <Type xmlns=\"http://schemas.microsoft.com/crm/2006/CoreTypes\">User</Type>" +
"        </Assignee>" +
"      </Request>" +
"    </Execute>" +
"  </soap:Body>" +
"</soap:Envelope>" +
"";

            var xmlHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");

            xmlHttpRequest.Open("POST", "/mscrmservices/2007/CrmService.asmx", false);
            xmlHttpRequest.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/crm/2007/WebServices/Execute");
            xmlHttpRequest.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlHttpRequest.setRequestHeader("Content-Length", xml.length);
            xmlHttpRequest.send(xml);

            // success test :
            var res = xmlHttpRequest.responseXML.text === "";

            if (!res) Broadlook.Library.showError("Cannot assign new owner");

            if (i >= (ids.length - 1)) // last iteration
                if (typeof (callback) != 'undefined' && callback != null)
                    callback(res);

        }
    },

    updateReqCallBack: function (updateAccountReq, callback, last) {
        if (updateAccountReq.readyState == 4 /* complete */) {
            //There appears to be an issue where IE maps the 204 status to 1223 when no content is returned.
            if (updateAccountReq.status == 204 || updateAccountReq.status == 1223) {
                //Success
                if (last)
                    if (typeof (callback) != 'undefined' && callback != null)
                        callback(true);
            }
            else {
                //Failure
                Broadlook.Library.errorHandler(updateAccountReq);
                if (last)
                    if (typeof (callback) != 'undefined' && callback != null)
                        callback(false);
            }
        }
    },


    deactivateProfilerLeads: function (Ids, callback) {

        if (typeof (Ids) == "undefined") {
            Broadlook.Library.showError("Missing paramter - Ids");
            callback(false);
            return;
        }


        var ids0 = Ids.split(';');
        var ids = [];
        for (var j = 0; j < ids0.length; j++) {
            var id0 = ids0[j];
            if (!Broadlook.Library.nz(id0)) continue;
            id0 = id0.replace('{', '').replace('}', '');
            ids.push(id0);
        }


        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];

            var requestMain = ""
            requestMain += "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">";
            requestMain += "  <s:Body>";
            requestMain += "    <Execute xmlns=\"http://schemas.microsoft.com/xrm/2011/Contracts/Services\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">";
            requestMain += "      <request i:type=\"b:SetStateRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\" xmlns:b=\"http://schemas.microsoft.com/crm/2011/Contracts\">";
            requestMain += "        <a:Parameters xmlns:c=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">";
            requestMain += "          <a:KeyValuePairOfstringanyType>";
            requestMain += "            <c:key>EntityMoniker</c:key>";
            requestMain += "            <c:value i:type=\"a:EntityReference\">";
            requestMain += "              <a:Id>" + id + "</a:Id>";
            requestMain += "              <a:LogicalName>" + Broadlook.Metadata.Entities.ProfilerLead.Name + "</a:LogicalName>";
            requestMain += "              <a:Name i:nil=\"true\" />";
            requestMain += "            </c:value>";
            requestMain += "          </a:KeyValuePairOfstringanyType>";
            requestMain += "          <a:KeyValuePairOfstringanyType>";
            requestMain += "            <c:key>State</c:key>";
            requestMain += "            <c:value i:type=\"a:OptionSetValue\">";
            requestMain += "              <a:Value>1</a:Value>";
            requestMain += "            </c:value>";
            requestMain += "          </a:KeyValuePairOfstringanyType>";
            requestMain += "          <a:KeyValuePairOfstringanyType>";
            requestMain += "            <c:key>Status</c:key>";
            requestMain += "            <c:value i:type=\"a:OptionSetValue\">";
            requestMain += "              <a:Value>2</a:Value>";
            requestMain += "            </c:value>";
            requestMain += "          </a:KeyValuePairOfstringanyType>";
            requestMain += "        </a:Parameters>";
            requestMain += "        <a:RequestId i:nil=\"true\" />";
            requestMain += "        <a:RequestName>SetState</a:RequestName>";
            requestMain += "      </request>";
            requestMain += "    </Execute>";
            requestMain += "  </s:Body>";
            requestMain += "</s:Envelope>";

            var req = new XMLHttpRequest();
            req.open("POST", Broadlook.Library.serverUrl + "XRMServices/2011/Organization.svc/web", true) // + "/web"
            // Responses will return XML. It isn't possible to return JSON.
            req.setRequestHeader("Accept", "application/xml, text/xml, */*");
            req.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            req.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/Execute");
            var successCallback = null;
            var errorCallback = null;
            req.onreadystatechange = function () { Broadlook.Library.SetStateResponse(req, callback, i >= (ids.length - 1)); };
            req.send(requestMain);

        }
    },


    SetStateResponse: function (req, callback, last) {

        if (req.readyState == 4) {
            if (req.status == 200) {
                if (last)
                    if (typeof (callback) != 'undefined' && callback != null)
                        callback(true);
            }
            else {
                //Failure
                Broadlook.Library.errorHandler(req);
                if (last)
                    if (typeof (callback) != 'undefined' && callback != null)
                        callback(false);
            }
        }
    },



    /******************************************************************************************

    Profiler Company

    ******************************************************************************************/

    retrieveProfilerCompanyRecord: function (Id, callback) {
        Broadlook.Library.retrieveRecord("blt_profilercompany", Id, callback);
    },

    //    retrieveProfilerCompanies: function (planid, callback) {

    //        var lib = Broadlook.Library;

    //        var path = lib.ODataPath + "/blt_profilercompanySet?$select=ProfilerCompanyId,StatusCode&$orderby=FullName&$filter=blt_profilerplanid eq Guid'"+planid+"'";

    //        var req = new XMLHttpRequest();
    //        req.open("GET", path, true);
    //        req.setRequestHeader("Accept", "application/json");
    //        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    //        req.onreadystatechange = function () {
    //            Broadlook.Library.retrieveRecordCallBack(this, callback);
    //        };
    //        req.send();
    //    },


    createProfilerCompanyRecord: function (Name, Url, PlanId, callback) {

        var record = new Object();
        record.blt_name = Name;
        record.blt_Url = Url;

        if (Broadlook.Library.nz(PlanId)) {
            record.blt_planid = new Object;
            record.blt_planid.Id = PlanId;
            record.blt_planid.LogicalName = 'blt_profilerplan';
        }

        var jsonRecord = window.JSON.stringify(record);

        var createReq = new XMLHttpRequest();
        createReq.open("POST", Broadlook.Library.ODataPath + "/blt_profilercompanySet", true);
        createReq.setRequestHeader("Accept", "application/json");
        createReq.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        createReq.onreadystatechange = function () {
            Broadlook.Library.createReqCallBack(this, callback);
        };
        createReq.send(jsonRecord);


    },


    /******************************************************************************************

    Common 

    ******************************************************************************************/

    daysInFebruary: function (year) {
        // February has 29 days in any year evenly divisible by four, 
        // EXCEPT for centurial years which are not also divisible by 400. 
        return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
    },

    pause: function (ms) {
        ms += new Date().getTime();
        while (new Date() < ms) { }
    },

    extractCrmError: function (responsetext) {

        if (Broadlook.Library.z(responsetext)) return null;

        var p = responsetext.indexOf('<span id="ErrorText"');

        if (p > 0) {

            var text = (responsetext + "").slice(p);
            text = text.slice(text.indexOf('>') + 1);
            text = text.slice(0, text.indexOf('<'));
            return text;
        }

        return null;
    },


    retrieveRecordCallBack: function (req, callback) {
        if (req.readyState == 4 /* complete */) {
            if (req.status == 200) {
                //Success
                var retrievedRecord = null;

                try {
                    retrievedRecord = JSON.parse(req.responseText).d;

                    if (typeof (callback) != 'undefined' && callback != null)
                        callback(retrievedRecord);

                }
                catch (err) {

                    var errortext = Broadlook.Library.extractCrmError(req.responseText);

                    if (Broadlook.Library.nz(errortext))
                        Broadlook.Library.showError(errortext);
                    else
                        Broadlook.Library.errorHandler(err);

                    if (typeof (callback) != 'undefined' && callback != null)
                        callback(false);

                }

            }
            else {
                //Failure
                Broadlook.Library.errorHandler(req);
                if (typeof (callback) != 'undefined' && callback != null)
                    callback(false);
            }
        }
    },


    createReqCallBack: function (req, callback) {
        if (req.readyState == 4 /* complete */) {
            if (req.status == 201) {
                //Success
                try {
                    var newRecord = JSON.parse(req.responseText).d;
                    if (typeof (callback) != 'undefined' && callback != null)
                        callback(newRecord);
                }
                catch (err) {

                    var errortext = Broadlook.Library.extractCrmError(req.responseText);

                    if (Broadlook.Library.nz(errortext))
                        Broadlook.Library.showError(errortext);
                    else
                        Broadlook.Library.errorHandler(err);

                    if (typeof (callback) != 'undefined' && callback != null)
                        callback(false);

                }
            }
            else {
                //Failure
                Broadlook.Library.errorHandler(req);
                if (typeof (callback) != 'undefined' && callback != null)
                    callback(false);
            }
        }
    },

    retrieveRecord: function (entityname, Id, callback) {

        if (!Broadlook.Library.nz(Id)) {
            Broadlook.Library.showError("Missing parameter - Id")
            callback(false); ;
            return;
        }

        if (!Broadlook.Library.nz(entityname)) {
            Broadlook.Library.showMessage("Missing parameter - entityname");
            callback(false);
            return;
        }

        Id = String(Id).replace('{', '').replace('}', '');

        var req = new XMLHttpRequest();
        var path = Broadlook.Library.ODataPath + "/" + entityname + "Set(guid'" + Id + "')";
        req.open("GET", path, true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            Broadlook.Library.retrieveRecordCallBack(this, callback);
        };
        req.send();

    },

    retrieveRecords: function (entityname, Ids, callback) {

        if (typeof (Ids) == "undefined") {
            Broadlook.Library.showError("Missing parameter -  Ids");
            callback(false);
            return;
        }

        if (typeof (entityname) == "undefined") {
            Broadlook.Library.showError("Missing parameter - entityname");
            callback(false);
            return;
        }

        if (Broadlook.Library.demo) {
            var demorecords = new Object;
            demorecords.results = [];

            var demorec = [];

            if (entityname == 'Lead')
                demorec["LeadId"] = "lead123";
            else
                demorec["ContactId"] = "contact123";

            demorec["FirstName"] = "MMaarryy";
            demorec["LastName"] = "SSmmiitthh";

            demorecords.results[0] = demorec;

            callback(demorecords);
            return;
        }

        var ids = Ids.split(';');
        var filter = "";
        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            if (!Broadlook.Library.nz(id)) continue;
            if (filter != "") filter += " or ";
            id = id.replace('{', '').replace('}', '');

            filter += entityname + "Id eq guid'" + id + "'";

        }



        var req = new XMLHttpRequest();
        var path = Broadlook.Library.ODataPath + "/" + entityname + "Set?$filter=" + filter;
        req.open("GET", path, true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            Broadlook.Library.retrieveRecordCallBack(this, callback);
        };
        req.send();

    },

    updateRecord: function (entityname, Id, requestedchanges, callback) {

        if (Broadlook.Library.demo) {

            Broadlook.Library.showError("Update opertaion is not supported in DEMO mode");
            if (Broadlook.Library.nz(callback))
                callback(true);

            return;

        }

        var req = new XMLHttpRequest();
        var changes = new Object();

        for (var i = 0; i < requestedchanges.length; i++) {
            changes[requestedchanges[i].fieldname] = requestedchanges[i].value;
        }

        req.open("POST", Broadlook.Library.ODataPath + "/" + entityname + "Set(guid'" + Id + "')", true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("X-HTTP-Method", "MERGE");
        req.onreadystatechange = function () {
            Broadlook.Library.updateReqCallBack(this, callback, true);
        };
        req.send(JSON.stringify(changes));

    },


    // checks that the object is not null and not empty
    nz: function (o) {
        if (typeof (o) == 'undefined' || o == null || String(o) == '') return false;
        return true;
    },

    // checks that the object is null or empty
    z: function (o) {
        return !Broadlook.Library.nz(o);
    },

    validateUrl: function (url) {

        var v = new RegExp();

        //v.compile( "^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$" );

        v.compile("[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");


        return v.test(url);

    },

    cleanMessages: function () {
        $("#status").html('');
    },

    //Function to display information on the HTML page.
    showMessage: function (message, classname, icon) {
        if (message == null) message = '';
        var duration = new Date(new Date() - Broadlook.Library.startTime);
        //var time = duration.getSeconds() + ":" + duration.getMilliseconds();
        var dvMessage = document.createElement("div");
        dvMessage.innerHTML =
        //time + " : " + 
            ("" + message).replace(/</g, '&lt;');

        if (Broadlook.Library.nz(icon)) {
            $(dvMessage).append(icon);
        }

        document.getElementById("status").appendChild(dvMessage);

        if (!$("#status").hasClass("ui-widget")) $("#status").addClass("ui-widget");

        if (Broadlook.Library.nz(classname)) {
            $(dvMessage).addClass(classname);
        }
    },

    showError: function (message) {

        Broadlook.Library.showMessage(message, "ui-state-error ui-corner-all", '<span style="margin-right: 0.3em; float: left;" class="ui-icon ui-icon-alert"></span>');

    },

    //Function to handle any http errors
    errorHandler: function (XmlHttpRequest) {

        var msg = '';

        try {
            msg = JSON.parse(XmlHttpRequest.responseText).error.message.value;
        } catch (err) {
            if (XmlHttpRequest.responseText)
                msg = XmlHttpRequest.responseText;
            else if (XmlHttpRequest.message)
                msg = XmlHttpRequest.message;
            else
                msg = XmlHttpRequest + "";
        }

        if (XmlHttpRequest.status)
            Broadlook.Library.showError(XmlHttpRequest.status + ": " + XmlHttpRequest.statusText + ": " + msg);
        else
            Broadlook.Library.showError(msg);

    },

    createLink: function (entity, id) {
        if (typeof (entity) == "undefined" || String(entity) == '') return;

        var url = Broadlook.Library.serverUrl;

        var appendtype = false;

        var entityname = String(entity);

        if (entityname == 'lead') url += 'SFA/leads/edit.aspx';
        else if (entityname == "opportunity") url += "SFA/opps/edit.aspx";
        else if (entityname == "account") url += "SFA/accts/edit.aspx";
        else if (entityname == "contact") url += "SFA/conts/edit.aspx";
        else if (entityname == "incident") url += "CS/cases/edit.aspx";
        else {
            url += "main.aspx";
            appendtype = true;
        }

        url += '?id=';
        url += String(id);

        if (appendtype) {
            url += "&etn=";
            url += entityname;
            url += "&pagetype=entityrecord";
        }

        return url;
    },




    /******************************************************************************************

    Workflows

    ******************************************************************************************/

    callOnDemandWF: function (workflowId, entityIds, entityTypeCode, callback) {

        if (Broadlook.Library.demo) {
            Broadlook.Library.showError("Not supported operation in DEMO mode");
            return;
        }

        //var a = new Array( entityIds );
        var a = entityIds.split(';');
        if (!Broadlook.Library.nz(a[a.length - 1])) a.pop();
        var sIds = String(entityIds); // +";";
        if (sIds[sIds.length - 1] != ';') sIds += ';';
        var sEntityTypeCode = entityTypeCode;
        //crmFormSubmit.crmFormSubmitObjectType.value; //Replace this with your entity type code
        var sWorkflowId = workflowId;
        var iWindowPosX = 500;

        if (!Broadlook.Library.nz(entityTypeCode))
            entityTypeCode = Broadlook.Library.entityTypeCode;

        if (!Broadlook.Library.nz(entityTypeCode)) {
            Broadlook.Library.showError("Cannot determine the Entity Type Code");
            return;
        }

        var iWindowPosY = 200;
        var oResult = openStdDlg(prependOrgName("/_grid/cmds/dlg_runworkflow.aspx") + "?iObjType=" + CrmEncodeDecode.CrmUrlEncode(sEntityTypeCode) + "&iTotal=" +
	    CrmEncodeDecode.CrmUrlEncode(a.length) + "&wfId=" + CrmEncodeDecode.CrmUrlEncode(sWorkflowId) + "&sIds=" + CrmEncodeDecode.CrmUrlEncode(sIds), a, iWindowPosX, iWindowPosY);

        if (Broadlook.Library.nz(callback))
            callback(oResult);

    },



    /******************************************************************************************

    Contact Capture Request

    ******************************************************************************************/

    createCaptureRequest: function (text, shield, callback) {

        var t = text + "";

        var record = new Object();
        //record.blt_name = t.slice( 0, 100 );
        record.blt_capturetext = t;
        record.blt_enableshield = shield;
        var jsonObject = window.JSON.stringify(record);

        var createReq = new XMLHttpRequest();
        createReq.open("POST", Broadlook.Library.ODataPath + "/blt_capturerequestSet", true);
        createReq.setRequestHeader("Accept", "application/json");
        createReq.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        createReq.onreadystatechange = function () {
            Broadlook.Library.createReqCallBack(this, callback);
        };
        createReq.send(jsonObject);

    },

    updateCaptureRequest: function (Id, text, shield, callback) {

        var t = text + "";

        var record = new Object();
        //record.blt_name = t.slice( 0, 100 );
        record.blt_capturetext = t;
        record.blt_enableshield = shield;
        var jsonObject = window.JSON.stringify(record);

        var createReq = new XMLHttpRequest();
        createReq.open("POST", Broadlook.Library.ODataPath + "/blt_capturerequestSet(guid'" + Id + "')", true);
        createReq.setRequestHeader("Accept", "application/json");
        createReq.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        createReq.setRequestHeader("X-HTTP-Method", "MERGE");
        createReq.onreadystatechange = function () {

            var req = this;

            if (req.readyState == 4 /* complete */) {
                //There appears to be an issue where IE maps the 204 status to 1223 when no content is returned.
                if (req.status == 204 || req.status == 1223) {
                    //Success
                    Broadlook.Library.retrieveCaptureRequest(Id, callback);
                }
                else {
                    //Failure
                    Broadlook.Library.errorHandler(req);
                    if (typeof (callback) != 'undefined' && callback != null)
                        callback(false);
                }
            }

        };
        createReq.send(jsonObject);

    },

    retrieveCaptureRequest: function (Id, callback) {


        var retrieveReq = new XMLHttpRequest();
        retrieveReq.open("GET", Broadlook.Library.ODataPath + "/blt_capturerequestSet(guid'" + Id + "')", true);
        retrieveReq.setRequestHeader("Accept", "application/json");
        retrieveReq.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        retrieveReq.onreadystatechange = function () {
            Broadlook.Library.retrieveRecordCallBack(this, callback);
        };
        retrieveReq.send();

    },

    /******************************************************************************************

    Contact Capture Contact

    ******************************************************************************************/

    retrieveCaptureContacts: function (uri, callback) {


        var retrieveReq = new XMLHttpRequest();

        retrieveReq.open("GET", uri, true);
        retrieveReq.setRequestHeader("Accept", "application/json");
        retrieveReq.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        retrieveReq.onreadystatechange = function () {
            Broadlook.Library.retrieveRecordCallBack(this, callback);
        };
        retrieveReq.send();

    },



    findCaptureContactChanges: function (original, current) {


        var me = Broadlook.Library;
        var a = original;
        var b = current;
        var f = "";
        var changes = [];

        if (a.blt_contactcaptureid !== b.blt_contactcaptureid)
            throw "Mismatching identificators";


        Broadlook.Library.addChange(changes, a, b, "blt_fullname");
        Broadlook.Library.addChange(changes, a, b, "blt_firstname");
        Broadlook.Library.addChange(changes, a, b, "blt_middlename");
        Broadlook.Library.addChange(changes, a, b, "blt_lastname");

        return changes;


    },

    addChange: function (list, original, current, fieldname) {

        if (typeof (current[fieldname]) != "undefined")
            if (original[fieldname] !== current[fieldname])
                list.push({ fieldname: fieldname, value: current[fieldname] });

    },



    /******************************************************************************************

    Conversion Wizard

    ******************************************************************************************/

    convertParams: {
        ending: "",
        source: "",
        target: "",
        newids: []

    },


    convertLeads: function (target, source) {

        var self = Broadlook.Library;
        self.cleanMessages();

        var s = String(jQuery("#grid").jqGrid('getGridParam', 'selarrrow'));
        if (s == '') {
            Broadlook.Library.showError("No records selected");
            return;
        }

        var rownums = s.split(',');
        if (rownums.length == 0) return;

        if (target != 'contact' && target != 'lead') {
            Broadlook.Library.showError("Not supported conversion target");
            return;
        }

        if (source != 'blt_capturecontact' && source != 'blt_profilerlead') {
            Broadlook.Library.showError("Not supported conversion source");
            return;
        }

        convertParams = new Object;

        convertParams.source = source;
        convertParams.target = target;


        convertParams.ending = "";
        if (rownums.length > 1) convertParams.ending = "s";


        convertParams.connlist = [];
        convertParams.connids = [];
        convertParams.connrownums = [];
        convertParams.savedids = [];
        convertParams.newlist = [];
        convertParams.newids = [];
        convertParams.companynames = [];



        for (var i = 0; i < rownums.length; i++) {
            var rownum = rownums[i];
            var rec = jQuery("#grid").jqGrid('getRowData', rownum);

            var guid;
            var name;
            var companyname;
            var connid;
            var connname;

            if (source == 'blt_capturecontact') {

                guid = rec['blt_capturecontactId'];
                name = rec['blt_fullname'];
                companyname = rec['blt_companyname'];

            }
            else {

                guid = rec['guid'];
                name = rec['name'];
                companyname = '';
            }

            if (target == 'lead') {
                connid = rec['crmleadid'];
                connname = rec['crmleadname'];
            } else {
                connid = rec['crmcontactid'];
                connname = rec['crmcontactname'];
            }

            if (Broadlook.Library.nz(companyname))
                convertParams.companynames.push(companyname);

            if (Broadlook.Library.nz(connid)) {

                var connlink = Broadlook.Library.formatConnectionLink(connid, connname, target, true);

                convertParams.connlist.push("<li>" + name + " is already connected to " + connlink + "</li>");
                convertParams.connids.push(connid);
                convertParams.connrownums.push(rownum);
                convertParams.savedids.push(guid);
            }
            else {
                convertParams.newlist.push("<li>" + name + "</li>");
                convertParams.newids.push(guid);
            }

        }

        $('.ending', '#converttargetdlg').text(convertParams.ending);

        $("#convert-list-existing").html("<ul>" + convertParams.connlist.join('') + "</ul>");
        $("#convert-list-new").html("<ul>" + convertParams.newlist.join('') + "</ul>");

        var h = $("#convert-header-existing").html();
        h = h.replace(/contact/gi, convertParams.target);
        h = h.replace(/lead/gi, convertParams.target);
        $("#convert-header-existing").html(h);

        h = $("#convert-header-new").html();
        h = h.replace(/contact/gi, convertParams.target);
        h = h.replace(/lead/gi, convertParams.target);
        $("#convert-header-new").html(h);

        if (convertParams.newids.length > 0) {
            $("#convert-header-new").show();
        } else {
            $("#convert-header-new").hide();
        }


        var updateexistingvalue = '0';
        if (convertParams.updateexisting === true || (convertParams.updateexisting !== false && convertParams.connids.length > 0)) updateexistingvalue = '1';

        $('#convert-checkbox-existing', '#converttargetdlg').val(updateexistingvalue);

        if (convertParams.connids.length > 0)
            $("#convert-header-existing").show();
        else
            $("#convert-header-existing").hide();


        //$( '#conversion-target', '#converttargetdlg' ).val( convertParams.target );

        Broadlook.Library.convertDialog(convertParams);


    },

    convertDialog: function (convertParams) {


        $("#converttargetdlg").dialog({
            title: 'Convert to ' + convertParams.target + convertParams.ending,
            width: 600,
            height: 200,
            modal: true,
            buttons: {
                "Next": function () {

                    convertParams.updateexisting = convertParams.connids.length > 0 && $('[#convert-checkbox-existing]:checked', '#converttargetdlg').val() == "1";

                    convertParams.lastStep = Broadlook.Library.convertDialog;

                    if (convertParams.updateexisting)
                        Broadlook.Library.mergeDialog(convertParams);
                    else {
                        if (convertParams.target == "contact")
                            Broadlook.Library.accountDialog(convertParams);
                        else
                            Broadlook.Library.ownerDialog(convertParams);
                    }

                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }

        }).width(570).height(170);

    },


    lookupAccount: function () {

        var searchstring = $("#AccountNameTextBox").val();
        Broadlook.Library.retrieveAccountRecords(searchstring, Broadlook.Library.accountCallback);

    },

    accountDialog: function (convertParams) {



        var selectlist = $('#account-list');
        $("option", selectlist).remove();

        if (selectlist.prop) {
            var options = selectlist.prop('options');
        }
        else {
            var options = selectlist.attr('options');
        }

        if (options) {
            $.each(convertParams.companynames, function (_, name) {
                if (name) {
                    options[options.length] = new Option(name, name);
                }
            });
        }

        if (Broadlook.Library.z(convertParams.accountRecords)) {

            convertParams.DefaultAccountName = Broadlook.Library.getDefaultAccountName();
            Broadlook.Library.convertParams = convertParams;

            if (convertParams.DefaultAccountName != '') {
                $("#AccountNameTextBox", "#lookupaccount").val(convertParams.DefaultAccountName);
                Broadlook.Library.lookupAccount();
            }
        }



        if (!convertParams.updateexisting)
            $("#lookupaccount").dialog({
                title: 'Select a parent account for the new contacts',
                width: 600,
                height: 200,
                modal: true,
                buttons: {
                    "Back": function () {
                        Broadlook.Library.convertDialog(convertParams);

                        $(this).dialog("close");
                    },
                    "Execute": function () {

                        var accountid = $("input[name:account]:checked", "#lookupres").val();
                        if (!Broadlook.Library.nz(accountid)) return;
                        Broadlook.Library.convertToNewCrmContact(convertParams.newids, convertParams.source, accountid);
                        $(this).dialog("close");
                    },
                    Cancel: function () {
                        $(this).dialog("close");
                    }
                }

            }).width(570).height(170);


        else
            $("#lookupaccount").dialog({
                title: 'Select a parent account for the new contacts',
                width: 600,
                height: 200,
                modal: true,
                buttons: {
                    "Back": function () {
                        Broadlook.Library.convertDialog(convertParams);

                        $(this).dialog("close");
                    },
                    "Next": function () {

                        var accountid = $("input[name:account]:checked", "#lookupres").val();
                        if (!Broadlook.Library.nz(accountid)) return;
                        convertParams.acc = accountid;
                        convertParams.lastStep = Broadlook.Library.accountDialog;

                        if (convertParams.source == "lead")
                            Broadlook.Library.ownerDialog(convertParams);
                        else
                            Broadlook.Library.convertToNewCrmContact(convertParams.newids, convertParams.source, accountid);


                        $(this).dialog("close");
                    },
                    Cancel: function () {
                        $(this).dialog("close");
                    }
                }

            }).width(570).height(170);

    },

    ownerDialog: function (convertParams) { // target, source, ids,

        if (Broadlook.Library.z(convertParams.ownerRecords)) {
            Broadlook.Library.convertParams = convertParams;

            convertParams.ownerRecords = [];
            Broadlook.Library.retrieveUsers(Broadlook.Library.ownerPartialCallback);
        }

        var ids = [];

        if (!convertParams.updateexisting)
            ids = convertParams.newids.concat(convertParams.savedids);
        else
            ids = convertParams.newids;

        $("#lookupowner").dialog({
            title: 'Select an owner for new records',
            width: 600,
            height: 200,
            modal: true,
            buttons: {
                "Back": function () {
                    convertParams.lastStep(convertParams);
                    $(this).dialog("close");
                },
                "Execute": function () {

                    var acc = $("input[name:systemuser]:checked", "#lookupowner-res").val();

                    if (!Broadlook.Library.nz(acc)) return;

                    if (convertParams.source == Broadlook.Metadata.Entities.ProfilerLead.Name) {
                        Broadlook.Library.assignProfilerLeads(ids.join(';'), acc);
                    }
                    else if (convertParams.source == Broadlook.Metadata.Entities.CaptureContact.Name) {
                        Broadlook.Library.assignCaptureContacts(ids.join(';'), acc);
                    }

                    if (convertParams.target == "lead") {
                        Broadlook.Library.convertToNewCrmLead(ids, convertParams.source);
                    } else if (convertParams.target == "contact") {
                        Broadlook.Library.convertToNewCrmContact(ids, convertParams.source, convertParams.acc);
                    }

                    Broadlook.Library.mergeExecute(convertParams);

                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }

        }).width(570).height(170);


    },

    ownerPartialCallback: function (records) {

        var lib = Broadlook.Library;
        if (typeof (records) === "undefined" || records === null) records = [];

        if (records.results && records.results.length > 0)
            lib.convertParams.ownerRecords = lib.convertParams.ownerRecords.concat(records.results);

        var nextUri = records.__next;

        if (typeof (nextUri) != 'undefined')
            lib.retrievRecords(nextUri, lib.ownerPartialCallback);
        else
            lib.ownerCallback(lib.convertParams.ownerRecords);

    },

    ownerCallback: function (records) {

        if (typeof (records) === "undefined" || records === null) return;

        //var convertParams = Broadlook.Library.convertParams;
        //convertParams.ownerRecords = records;

        var s0 = [];
        s0.push("<div>");

        var s = [];
        s.push("<div>");


        var defvalue = Broadlook.Library.currentUserId.replace('{', '').replace('}', '').toLowerCase();

        if (records.length == 0) {
            Broadlook.Library.addAccountRow(s, "No users found", "");
        }
        else {

            for (var i = 0; i < records.length; i++) {

                var name = records[i].FullName;
                var id = records[i].SystemUserId.replace('{', '').replace('}', '').toLowerCase();

                var radio = Broadlook.Library.formatRadio("systemuser", id, name, defvalue);
                var link = Broadlook.Library.formatTextLink(id, "View", "systemuser");

                if (id == defvalue)
                    Broadlook.Library.addAccountRow(s0, radio, link);
                else
                    Broadlook.Library.addAccountRow(s, radio, link);
            }
        }


        s0.push("</div>");
        s.push("</div>");

        if (s0.length > 2) s0.push('<hr>');

        $("#lookupowner-res").html(s0.join('') + s.join(''));

    },


    mergeCallback: function (crmrecords) {

        var self = Broadlook.Library;

        var convertParams = Broadlook.Library.convertParams;

        convertParams.mergeRecords = crmrecords;

        $("#converttargetdlg").dialog("close");


        var arr_connids = convertParams.connids;
        var arr_connrownums = convertParams.connrownums;

        var crmidfield = 'ContactId';
        if (convertParams.target == 'lead') crmidfield = 'LeadId';

        var rows = [];

        var first = $("#merge-first-template", "#merge-dlg");
        rows.push("<tr>" + first.html() + "</tr>");

        var second = $("#merge-second-template", "#merge-dlg");
        rows.push("<tr>" + second.html() + "</tr>");

        var s = '';
        var n = new Object;
        n.value = 0;
        n.group = 0;



        for (var i = 0; i < arr_connrownums.length; i++) {

            var rownum = arr_connrownums[i];
            var gridrecord = jQuery("#grid").jqGrid('getRowData', rownum);

            var crmrecord = null;
            for (var j = 0; j < crmrecords.results.length; j++)
                if (crmrecords.results[j][crmidfield] == arr_connids[i]) {
                    crmrecord = crmrecords.results[j];
                    break;
                }

            if (crmrecord == null) {
                newids += arr_connids[i] + ";";
                continue;
            }

            n.group = i;

            rows.push(Broadlook.Library.addRows(crmrecord, gridrecord, n, convertParams.target).join(''));

        }

        $("#merge-table").html('');
        $('<table></table>').append(rows.join('')).appendTo("#merge-table");


        $('#merge-all-radio1, #merge-all-radio2', "#merge-table").click(function (event) {

            var group = event.target.id.slice(-1);

            if (group == 1) {
                $("input[type='radio'][id*='radio1'][id*='person']", "#merge-table").click();
            }
            else {
                $("input[type='radio'][id*='radio2'][id*='person']", "#merge-table").click();
            }

        });

        $("input[type='radio'][id*='radio'][id*='person']", "#merge-table").click(function (event) {

            var id = $(event.target).attr('id');
            var group = id.slice(id.indexOf('-group') + 6);
            var side = id.slice(id.indexOf('-radio') + 6, id.indexOf('-group'));

            var rows = $("tr[id*='group" + group + "']", "#merge-table");

            $("input[type='radio'][id*='radio" + side + "']", rows).click();

        });


        //        if (convertParams.target == 'contact') {
        //            var accountid = self.getDefaultAccountId();
        //            if (accountid != null) {
        //                alert(accountid);
        //                self.retrieveRecord("Account", accountid, self.mergeAccountCallback);
        //            }
        //        }


    },


    enrichParams: null,

    enrichAccountExecute: function (profilercompanyrecord) {

        var self = Broadlook.Library;
        self.cleanMessages();

        self.enrichParams = new Object;
        self.enrichParams.profilercompany = profilercompanyrecord;

        var accountid = self.getDefaultAccountId();
        if (accountid == null) {
            self.showError("No linked account.");
            return;
        }

        self.retrieveRecord("Account", accountid, self.enrichAccountCallback);


    },

    enrichAccountCallback: function (crmrecord) {

        var self = Broadlook.Library;

        if (!crmrecord) {
            self.showError("The account does not exist in CRM anymore or you have no access.");
            return;
        }

        // prepare data

        //var arr_connids = convertParams.connids;
        //var arr_connrownums = convertParams.connrownums;

        var crmidfield = 'AccountId';
        var rows = [];

        var first = $("#merge-first-template", "#merge-dlg");
        rows.push("<tr>" + first.html() + "</tr>");

        var second = $("#merge-second-template", "#merge-dlg");
        rows.push("<tr>" + second.html() + "</tr>");

        var s = '';
        var n = new Object;
        n.value = 0;
        n.group = 0;



        //        for (var i = 0; i < arr_connrownums.length; i++) {

        //            var rownum = arr_connrownums[i];
        //            var gridrecord = jQuery("#grid").jqGrid('getRowData', rownum);

        //            var crmrecord = null;
        //            for (var j = 0; j < crmrecords.results.length; j++)
        //                if (crmrecords.results[j][crmidfield] == arr_connids[i]) {
        //                    crmrecord = crmrecords.results[j];
        //                    break;
        //                }

        //            if (crmrecord == null) {
        //                newids += arr_connids[i] + ";";
        //                continue;
        //            }

        //            n.group = i;

        //            rows.push(Broadlook.Library.addRows(crmrecord, gridrecord, n, convertParams.target).join(''));

        //        }

        var profilerrecord = self.enrichParams.profilercompany;


        rows.push(Broadlook.Library.addAccountRows(crmrecord, profilerrecord, 0).join(''));



        $("#merge-table").html('');
        $('<table></table>').append(rows.join('')).appendTo("#merge-table");


        $('#merge-all-radio1, #merge-all-radio2', "#merge-table").click(function (event) {

            var group = event.target.id.slice(-1);

            if (group == 1) {
                $("input[type='radio'][id*='radio1'][id*='person']", "#merge-table").click();
            }
            else {
                $("input[type='radio'][id*='radio2'][id*='person']", "#merge-table").click();
            }

        });

        $("input[type='radio'][id*='radio'][id*='person']", "#merge-table").click(function (event) {

            var id = $(event.target).attr('id');
            var group = id.slice(id.indexOf('-group') + 6);
            var side = id.slice(id.indexOf('-radio') + 6, id.indexOf('-group'));

            var rows = $("tr[id*='group" + group + "']", "#merge-table");

            $("input[type='radio'][id*='radio" + side + "']", rows).click();

        });


        // display dialog
        var nextbtnlabel = "Execute";
        //if (convertParams.newids.length > 0) nextbtnlabel = "Next";

        $("#merge-dlg").dialog({
            title: 'Enrich account data',
            width: 600,
            height: 200,
            modal: true,
            buttons: {
                /*Back: function () {

                Broadlook.Library.convertDialog(convertParams);
                $(this).dialog("close");

                },*/
                "Execute": function () {
                    // update fields

                    var rows = $("TR", "#merge-table")
                    var merges = [];
                    var merge = null;

                    for (var i = 0; i < rows.length; i++) {

                        var row = rows[i];
                        var headerrowindicator = $("#merge-row-id", row).val(); // -name

                        if (Broadlook.Library.nz(headerrowindicator)) {
                            //header row
                            if (merge != null) merges.push(merge);
                            merge = new Object;
                            merge.id = headerrowindicator;
                            merge.changes = [];

                        }
                        else {
                            //data row
                            var selection = $("#merge-row-radio2:checked", row).val();
                            if (selection === "1") {
                                var fieldname = $("#merge-row-fieldname", row).val();
                                var newvalue = $("#merge-row-label2", row).text();
                                var change = new Object;
                                change.fieldname = fieldname;
                                change.value = newvalue;
                                if (merge != null) merge.changes.push(change);
                            }
                        }

                    }

                    if (merge != null) merges.push(merge);


                    if (Broadlook.Library.nz(merges)) {
                        for (i = 0; i < merges.length; i++) {
                            Broadlook.Library.updateRecord("Account", merges[i].id, merges[i].changes, null);
                        }
                    }

                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }

        }).width(570).height(170);

    },

    addAccountRows: function (crmrecord, profilerrecord, n) {

        var rows = [];
        var prefix = 'blt_';
        var name = profilerrecord['blt_name']; //PR
        var crmid = crmrecord['AccountId'];

        var headertemplate = $("#merge-header-template", "#merge-dlg");

        var header = headertemplate.clone();
        $('#merge-header-profilerrecord', header).html(name);
        $('#merge-header-crmrecord', header).html(Broadlook.Library.formatConnectionLink(crmid, crmrecord['Name'], "account", true));

        $("#merge-person-radio1", header).attr('name', "merge-person-radio-group" + n.group);
        $("#merge-person-radio2", header).attr('name', "merge-person-radio-group" + n.group);
        $("#merge-person-radio1", header).attr('id', "merge-person-radio1-group" + n.group);
        $("#merge-person-radio2", header).attr('id', "merge-person-radio2-group" + n.group);


        $('#merge-row-id', header).val(crmid);

        rows.push("<tr>" + header.html() + "</tr>");

        var rowtemplate = $("#merge-row-template", "#merge-dlg");
        var haschanges = false;
        var row;



        row = rowtemplate.clone();
        if (Broadlook.Library.addRow(row, crmrecord, profilerrecord, 'Account Name', 'Name', prefix + 'name', n)) {
            haschanges = true;
            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        }

        row = rowtemplate.clone();
        if (Broadlook.Library.addRow(row, crmrecord, profilerrecord, 'Website', 'WebSiteURL', prefix + 'Url', n)) {
            haschanges = true;
            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        }

        row = rowtemplate.clone();
        if (Broadlook.Library.addRow(row, crmrecord, profilerrecord, 'Main Phone', 'Telephone1', prefix + 'telephone', n)) {
            haschanges = true;
            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        }


        // SIC 
        row = rowtemplate.clone();
        if (Broadlook.Library.addRow(row, crmrecord, profilerrecord, 'SIC Code', 'SIC', prefix + 'SIC', n)) {
            haschanges = true;
            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        }

        // DUNS
        //        row = rowtemplate.clone();
        //        if (Broadlook.Library.addRow(row, crmrecord, profilerrecord, 'D-U-N-S Number', 'crm_text_field_here', prefix + 'duns', n)) {
        //            haschanges = true;
        //            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        //        }


        row = rowtemplate.clone();
        if (Broadlook.Library.addRow(row, crmrecord, profilerrecord, 'Street 1', 'Address1_Line1', prefix + 'address_line1', n)) {
            haschanges = true;
            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        }

        row = rowtemplate.clone();
        if (Broadlook.Library.addRow(row, crmrecord, profilerrecord, 'Street 2', 'Address1_Line2', prefix + 'address_line2', n)) {
            haschanges = true;
            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        }

        row = rowtemplate.clone();
        if (Broadlook.Library.addRow(row, crmrecord, profilerrecord, 'City', 'Address1_City', prefix + 'address_city', n)) {
            haschanges = true;
            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        }

        row = rowtemplate.clone();
        if (Broadlook.Library.addRow(row, crmrecord, profilerrecord, 'State/Province', 'Address1_StateOrProvince', prefix + 'address_stateorprovince', n)) {
            haschanges = true;
            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        }

        row = rowtemplate.clone();
        if (Broadlook.Library.addRow(row, crmrecord, profilerrecord, 'ZIP/Postal Code', 'Address1_PostalCode', prefix + 'address_postalcode', n)) {
            haschanges = true;
            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        }

        // industry
        //        row = rowtemplate.clone();
        //        if (Broadlook.Library.addRow(row, crmrecord, profilerrecord, 'Industry', 'crm_text_field_here', prefix + 'Industry', n)) {
        //            haschanges = true;
        //            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        //        }

        // revenue
        //        row = rowtemplate.clone();
        //        if (Broadlook.Library.addRow(row, crmrecord, profilerrecord, 'Revenue', 'crm_text_field_here', prefix + 'Revenue', n)) {
        //            haschanges = true;
        //            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        //        }

        // # of employees (range)
        //        row = rowtemplate.clone();
        //        if (Broadlook.Library.addRow(row, crmrecord, profilerrecord, 'Number of Employees', 'crm_text_field_here', prefix + 'Employees', n)) {
        //            haschanges = true;
        //            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        //        }

        if (!haschanges) {
            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'><td colspan='5'>No changes</td></tr>");
        }

        return rows;
    },


    mergeDialog: function (convertParams) {

        var self = Broadlook.Library;

        if (Broadlook.Library.z(convertParams.mergeRecords)) {
            Broadlook.Library.convertParams = convertParams;
            var setname = "Lead";
            if (convertParams.target == 'contact') setname = "Contact";
            Broadlook.Library.retrieveRecords(setname, convertParams.connids.join(';'), Broadlook.Library.mergeCallback);



        }

        var nextbtnlabel = "Execute";
        if (convertParams.newids.length > 0) nextbtnlabel = "Next";

        $("#merge-dlg").dialog({
            title: 'Update existing CRM data',
            width: 600,
            height: 200,
            modal: true,
            buttons: {
                Back: function () {

                    Broadlook.Library.convertDialog(convertParams);
                    $(this).dialog("close");

                },
                "Next": function () {
                    // update fields

                    var rows = $("TR", "#merge-table")
                    var merges = [];
                    var merge = null;

                    for (var i = 0; i < rows.length; i++) {

                        var row = rows[i];
                        var headerrowindicator = $("#merge-row-id", row).val(); // -name

                        if (Broadlook.Library.nz(headerrowindicator)) {
                            //header row
                            if (merge != null) merges.push(merge);
                            merge = new Object;
                            merge.id = headerrowindicator;
                            merge.changes = [];

                        }
                        else {
                            //data row
                            var selection = $("#merge-row-radio2:checked", row).val();
                            if (selection === "1") {
                                var fieldname = $("#merge-row-fieldname", row).val();
                                var newvalue = $("#merge-row-label2", row).text();
                                var change = new Object;
                                change.fieldname = fieldname;
                                change.value = newvalue;
                                if (merge != null) merge.changes.push(change);
                            }
                        }

                    }

                    if (merge != null) merges.push(merge);

                    convertParams.merges = merges;

                    if (convertParams.newids.length > 0) {
                        convertParams.lastStep = Broadlook.Library.mergeDialog;


                        if (convertParams.target == "contact")
                            Broadlook.Library.accountDialog(convertParams);
                        else
                            Broadlook.Library.ownerDialog(convertParams);
                    }
                    else
                        Broadlook.Library.mergeExecute(convertParams);

                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }

        }).width(570).height(170);
    },

    mergeExecute: function (convertParams) {

        var merges = convertParams.merges;

        if (Broadlook.Library.z(merges)) return;

        for (i = 0; i < merges.length; i++) {

            if (convertParams.target == 'lead')
                Broadlook.Library.updateRecord("Lead", merges[i].id, merges[i].changes, null);
            else if (convertParams.target == 'contact')
                Broadlook.Library.updateRecord("Contact", merges[i].id, merges[i].changes, null);

        }



    },


    addRows: function (crmrecord, gridrecord, n, target) {

        var rows = [];
        var prefix = '';
        var name = gridrecord['name']; //PR
        if (!name) {
            name = gridrecord['blt_fullname']; //CC
            prefix = 'blt_';
        }

        var crmid;

        if (target == 'lead') crmid = crmrecord['LeadId']; else crmid = crmrecord['ContactId'];

        var headertemplate = $("#merge-header-template", "#merge-dlg");

        var header = headertemplate.clone();
        $('#merge-header-profilerrecord', header).html(name);
        $('#merge-header-crmrecord', header).html(Broadlook.Library.formatConnectionLink(crmid, crmrecord['FullName'], target, true));

        $("#merge-person-radio1", header).attr('name', "merge-person-radio-group" + n.group);
        $("#merge-person-radio2", header).attr('name', "merge-person-radio-group" + n.group);
        $("#merge-person-radio1", header).attr('id', "merge-person-radio1-group" + n.group);
        $("#merge-person-radio2", header).attr('id', "merge-person-radio2-group" + n.group);


        $('#merge-row-id', header).val(crmid);

        rows.push("<tr>" + header.html() + "</tr>");

        var rowtemplate = $("#merge-row-template", "#merge-dlg");
        var haschanges = false;
        var row;



        row = rowtemplate.clone();
        if (Broadlook.Library.addRow(row, crmrecord, gridrecord, 'First Name', 'FirstName', prefix + 'firstname', n)) {
            haschanges = true;
            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        }

        row = rowtemplate.clone();
        if (Broadlook.Library.addRow(row, crmrecord, gridrecord, 'Middle Name', 'MiddleName', prefix + 'middlename', n)) {
            haschanges = true;
            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        }

        row = rowtemplate.clone();
        if (Broadlook.Library.addRow(row, crmrecord, gridrecord, 'Last Name', 'LastName', prefix + 'lastname', n)) {
            haschanges = true;
            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        }

        if (target == 'lead') {
            row = rowtemplate.clone();
            var fn = 'contextcompany';
            if (prefix != '') fn = 'blt_companyname';
            if (Broadlook.Library.addRow(row, crmrecord, gridrecord, 'Company Name', 'CompanyName', fn, n)) {
                rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + "</tr>");
                haschanges = true;
            }
        }

        row = rowtemplate.clone();
        fn = 'title'; if (prefix != '') fn = 'blt_jobtitle';
        if (Broadlook.Library.addRow(row, crmrecord, gridrecord, 'Job Title', 'JobTitle', fn, n)) {
            haschanges = true;
            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        }

        row = rowtemplate.clone();
        fn = 'phone'; if (prefix != '') fn = 'blt_telephone1';
        if (Broadlook.Library.addRow(row, crmrecord, gridrecord, 'Phone', 'Telephone1', fn, n)) {
            haschanges = true;
            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        }

        row = rowtemplate.clone();
        fn = 'phone2'; if (prefix != '') fn = 'blt_telephone2';
        if (Broadlook.Library.addRow(row, crmrecord, gridrecord, 'Phone 2', 'Telephone2', fn, n)) {
            haschanges = true;
            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        }

        row = rowtemplate.clone();
        fn = 'email'; if (prefix != '') fn = 'EmailAddress';
        if (Broadlook.Library.addRow(row, crmrecord, gridrecord, 'Email', 'EMailAddress1', fn, n)) {
            haschanges = true;
            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'>" + row.html() + "</tr>");
        }

        if (!haschanges) {
            rows.push("<tr id='merge-row-" + n.value + "-group" + n.group + "'><td colspan='5'>No changes</td></tr>");
        }

        return rows;
    },

    stripTags: function (string) {
        var tagMatcher = new RegExp('<[^<>]+>', 'g');
        if (string == null) string = '';
        return string.replace(tagMatcher, '');
    },

    addRow: function (row, crmrecord, profilerrecord, label, crmproperty, profilerproperty, n) {

        var crmvalue = crmrecord[crmproperty];
        var profilervalue = Broadlook.Library.stripTags(profilerrecord[profilerproperty]);

        if (typeof (crmvalue) == 'undefined') crmvalue = '';

        if (!Broadlook.Library.nz(profilervalue)) return false;
        if (crmvalue == profilervalue) return false;

        n.value++;

        $('#merge-row-fieldlabel', row).text(label);
        $('#merge-row-fieldname', row).val(crmproperty);

        $('#merge-row-label1', row).text(crmvalue);
        $('#merge-row-label2', row).text(profilervalue);

        $('#merge-row-radio1', row).attr("name", "merge-row-" + n.value + "-radio-" + profilerproperty);
        $('#merge-row-radio2', row).attr("name", "merge-row-" + n.value + "-radio-" + profilerproperty);

        return true;

    },

    convertToNewCrmLead: function (ids, source) {

        if (Broadlook.Library.demo) {

            Broadlook.Library.showError("Convert opertaion is not supported in DEMO mode");
            return;

        }

        if (!Broadlook.Library.nz(ids)) {
            Broadlook.Library.showError("Nothing to convert");
            return;
        }

        if (source == Broadlook.Metadata.Entities.CaptureContact.Name)
            Broadlook.Library.callOnDemandWF(
                Broadlook.Metadata.Workflows.ConvertCaptureContactToNewCrmLead,
                ids.join(';'),
                Broadlook.Metadata.Entities.CaptureContact.EntityTypeCode,
                Broadlook.ContactCapture.loadGrid);
        else if (source == Broadlook.Metadata.Entities.ProfilerLead.Name)
            Broadlook.Library.callOnDemandWF(Broadlook.Metadata.Workflows.ConvertProfilerLeadToNewCrmLead, ids.join(';'), Broadlook.Metadata.Entities.ProfilerLead.EntityTypeCode);
        else
            Broadlook.Library.showError("Unsupported source - " + source);
    },



    convertToNewCrmContact: function (ids, source, acc) {

        if (Broadlook.Library.demo) {

            Broadlook.Library.showError("Convert opertaion is not supported in DEMO mode");
            return;
        }

        if (!Broadlook.Library.nz(ids)) {
            Broadlook.Library.showError("Nothing to convert");
            return;
        }

        if (acc == 'new') {

            // create new account (blank)

            Broadlook.Library.createAccountRecord("", function (accountid) {

                if (!accountid) return;

                if (source == Broadlook.Metadata.Entities.ProfilerLead.Name) {
                    // connect to this account
                    Broadlook.Library.connectProfilerLeadsToCrmAccount(ids.join(';'), accountid);
                    // convert and  fill out the account
                    Broadlook.Library.callOnDemandWF(Broadlook.Metadata.Workflows.ConvertProfilerLeadToNewCrmContactAndNewCrmAccount, ids.join(';'), Broadlook.Metadata.Entities.ProfilerLead.EntityTypeCode);
                }
                else if (source == Broadlook.Metadata.Entities.CaptureContact.Name) {
                    // connect to this account
                    Broadlook.Library.connectCaptureContactsToCrmAccount(ids.join(';'), accountid);
                    // convert and  fill out the account
                    Broadlook.Library.callOnDemandWF(Broadlook.Metadata.Workflows.ConvertCaptureContactToNewCrmContactAndNewCrmAccount, ids.join(';'), Broadlook.Metadata.Entities.CaptureContact.EntityTypeCode);
                }
            });

        }
        else if (acc == 'none') {
            if (source == Broadlook.Metadata.Entities.ProfilerLead.Name) {
                Broadlook.Library.callOnDemandWF(Broadlook.Metadata.Workflows.ConvertProfilerLeadToNewCrmContact, ids.join(';'), Broadlook.Metadata.Entities.ProfilerLead.EntityTypeCode);
            }
            else if (source == Broadlook.Metadata.Entities.CaptureContact.Name) {
                Broadlook.Library.callOnDemandWF(Broadlook.Metadata.Workflows.ConvertCaptureContactToNewCrmContact, ids.join(';'), Broadlook.Metadata.Entities.CaptureContact.EntityTypeCode);
            }
        }
        else {
            if (source == Broadlook.Metadata.Entities.ProfilerLead.Name) {
                Broadlook.Library.connectProfilerLeadsToCrmAccount(ids.join(';'), acc);
                Broadlook.Library.callOnDemandWF(Broadlook.Metadata.Workflows.ConvertProfilerLeadToNewCrmContact, ids.join(';'), Broadlook.Metadata.Entities.ProfilerLead.EntityTypeCode);
            }
            else if (source == Broadlook.Metadata.Entities.CaptureContact.Name) {
                Broadlook.Library.connectCaptureContactsToCrmAccount(ids.join(';'), acc);
                Broadlook.Library.callOnDemandWF(Broadlook.Metadata.Workflows.ConvertCaptureContactToNewCrmContact, ids.join(';'), Broadlook.Metadata.Entities.CaptureContact.EntityTypeCode);
            }
        }


    },


    accountCallback: function (records) {

        if (typeof (records) === "undefined" || records === null) return;


        var convertParams = Broadlook.Library.convertParams;
        convertParams.accountRecords = records;


        var s0 = [];
        s0.push("<div>");

        var s = [];
        s.push("<div>");


        var defvalue = Broadlook.Library.getDefaultAccountId();

        if (records.results == 0) {
            Broadlook.Library.addAccountRow(s, "No matching accounts found", "");
        }
        else {
            for (var i = 0; i < records.results.length; i++) {

                var name = records.results[i].Name;
                var id = records.results[i].AccountId;
                var radio = Broadlook.Library.formatRadio("account", id, name, defvalue);
                var link = Broadlook.Library.formatTextLink(id, "View", "account");

                if (id == defvalue)
                    Broadlook.Library.addAccountRow(s0, radio, link);
                else
                    Broadlook.Library.addAccountRow(s, radio, link);
            }
        }

        var radio1 = Broadlook.Library.formatRadio("account", "new", "Create new account", defvalue);
        Broadlook.Library.addAccountRow(s0, radio1, "");

        var radio2 = Broadlook.Library.formatRadio("account", "none", "Create contacts without account", defvalue);
        Broadlook.Library.addAccountRow(s0, radio2, "");

        s0.push("</div>");
        s.push("</div>");

        s0.push('<hr>');

        $("#lookupres").html(s0.join('') + s.join(''));


    },

    getDefaultAccountId: function () {

        if (Broadlook.Library.demo) {
            return "ID2";
        }

        var xrmPage = Broadlook.Library.getXrmPage();

        if (Broadlook.Library.entityTypeName == Broadlook.Metadata.Entities.ProfilerCompany.Name) {
            return Broadlook.CompanyViewer.crmaccountId;
        }
        else if (Broadlook.Library.entityTypeName == "account") {
            return xrmPage.data.entity.getId();
        }
        else if (Broadlook.Library.entityTypeName == "lead") {
            return null;
        }

        return null;
    },

    getDefaultAccountName: function () {

        if (Broadlook.Library.demo) {
            return "Demo";
        }

        var xrmPage = Broadlook.Library.getXrmPage();

        if (Broadlook.Library.entityTypeName == Broadlook.Metadata.Entities.ProfilerCompany.Name) {

            if (Broadlook.Library.nz(Broadlook.CompanyViewer.crmaccountName))
                return Broadlook.CompanyViewer.crmaccountName;
            else
                return xrmPage.data.entity.attributes.get('blt_name').getValue();
        }
        else if (Broadlook.Library.entityTypeName == "account") {
            return xrmPage.data.entity.attributes.get('name').getValue();
        }
        else if (Broadlook.Library.entityTypeName == "lead") {
            return xrmPage.data.entity.attributes.get('companyname').getValue();
        }
        else if (convertParams.companynames && convertParams.companynames.length > 0)
            return convertParams.companynames[0];


        return '';

    },

    addAccountRow: function (s, radio, link) {
        s.push("<div><span class='lookup-res-name'>");
        s.push(radio);
        s.push("</span>&nbsp;&nbsp;<span class='lookup-res-link'>");
        s.push(link);
        s.push("</span></div>");
    },

    formatRadio: function (groupname, value, text, defaultvalue) {
        var selected = '';
        if (value === defaultvalue) selected = ' checked ';

        var id = groupname + "_" + value;
        id = id.replace(' ', '_');

        return "<input type='radio' id='" + id + "' name='" + groupname + "' value='" + value + "' " + selected + " /><label for='" + id + "'>" + text + "</label>";
    },

    formatTextLink: function (id, name, entity) {

        if (typeof (id) == 'undefined' || id == null) return '';

        var n = name;
        if (n == null || n.length == 0) n = '...';

        var link = '';

        if (typeof (entity) == 'undefined' || entity == null)
            link = id;
        else
            link = Broadlook.Library.createLink(entity, id);

        return "<a target='_blank' href='" + link + "'>" + n + "</a>";
    },

    formatConnectionLink: function (id, name, entity, showlabel) {

        if (typeof (id) == 'undefined' || id == null) return '';

        var n = name;
        if (n == null || n.length == 0) n = '...';

        var link = Broadlook.Library.createLink(entity, id);

        var label = '';
        if (showlabel)
            label = '&nbsp;' + n;
        return "<a target='_blank' href='" + link + "'><img src='Images/crm" + entity + ".gif' alt='" + n + "' title='" + n + "' class='connection-image'><span>" + label + "</span></a>";
    },

    __namespace: true
};


(function ($) {
    $.widget("ui.combobox", {
        _create: function () {
            var self = this,
					select = this.element.hide(),
					selected = select.children(":selected"),
					value = selected.val() ? selected.text() : "";
            var input = this.input = $("<input>")
					.insertAfter(select)
					.val(value)
					.autocomplete({
					    delay: 0,
					    minLength: 0,
					    source: function (request, response) {
					        var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
					        response(select.children("option").map(function () {
					            var text = $(this).text();
					            if (this.value && (!request.term || matcher.test(text)))
					                return {
					                    label: text.replace(
											new RegExp(
												"(?![^&;]+;)(?!<[^<>]*)(" +
												$.ui.autocomplete.escapeRegex(request.term) +
												")(?![^<>]*>)(?![^&;]+;)", "gi"
											), "<strong>$1</strong>"),
					                    value: text,
					                    option: this
					                };
					        }));
					    },
					    select: function (event, ui) {
					        ui.item.option.selected = true;
					        self._trigger("selected", event, {
					            item: ui.item.option
					        });
					    },
					    change: function (event, ui) {
					        if (!ui.item) {
					            var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex($(this).val()) + "$", "i"),
									valid = false;
					            select.children("option").each(function () {
					                if ($(this).text().match(matcher)) {
					                    this.selected = valid = true;
					                    return false;
					                }
					            });
					            if (!valid) {
					                // remove invalid value, as it didn't match anything
					                $(this).val("");
					                select.val("");
					                input.data("autocomplete").term = "";
					                return false;
					            }
					        }
					    }
					})
					.addClass("ui-widget ui-widget-content ui-corner-left");

            input.data("autocomplete")._renderItem = function (ul, item) {
                return $("<li></li>")
						.data("item.autocomplete", item)
						.append("<a>" + item.label + "</a>")
						.appendTo(ul);
            };

            this.button = $("<button type='button'>&nbsp;</button>")
					.attr("tabIndex", -1)
					.attr("title", "Show All Items")
					.insertAfter(input)
					.button({
					    icons: {
					        primary: "ui-icon-triangle-1-s"
					    },
					    text: false
					})
					.removeClass("ui-corner-all")
					.addClass("ui-corner-right ui-button-icon")
					.click(function () {
					    // close if already visible
					    if (input.autocomplete("widget").is(":visible")) {
					        input.autocomplete("close");
					        return;
					    }

					    // work around a bug (likely same cause as #5265)
					    $(this).blur();

					    // pass empty string as value to search for, displaying all results
					    input.autocomplete("search", "");
					    input.focus();
					});
        },

        destroy: function () {
            this.input.remove();
            this.button.remove();
            this.element.show();
            $.Widget.prototype.destroy.call(this);
        }
    });
})(jQuery);