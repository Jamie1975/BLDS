var strId = '';
            // Function called on click of select all link of actual crm data
            function resetRadio(conId, ledId)
            {
                try
                {
                    if(conId != '' && conId != null)
                    {
                        for(var i=1; i<52 ; i++)
                        {
                            var j = i+1;
                            var tempParam1 = 'param'+i+conId;
                            var tempParam2 = 'param'+j+conId;
                            // unchecking adjacent radio button
                            if(document.getElementById(tempParam2) != null) 
                            {
                                document.getElementById(tempParam2).checked = false; 
                            }
                            // checking current side radio button
                            if(document.getElementById(tempParam1) != null) 
                            {
                                document.getElementById(tempParam1).checked = true; 
                            }
                            i++;
                        }
                        // calling an action function to bind contact data selected
                        reFillMapToUpdate(conId, 'Actual');
                    }
                    else if(ledId != '' && ledId != null)
                    {
                        for(var i=1; i<52 ; i++)
                        {
                            var j = i+1;
                            var tempParam1 = 'param'+i+ledId;
                            var tempParam2 = 'param'+j+ledId;
                            // unchecking adjacent radio button
                            if(document.getElementById(tempParam2) != null) 
                            {
                                document.getElementById(tempParam2).checked = false; 
                            }
                            // checking current side radio button
                            if(document.getElementById(tempParam1) != null) 
                            {
                                document.getElementById(tempParam1).checked = true; 
                            }
                            i++;
                        }
                        // calling an action function to bind lead data selected
                        reFillMapToUpdate(ledId, 'Actual');
                    }
                    return false;
                }
                catch(e){}
            }
            // Function called on click of select all link of captured data
            function resetRadioBack(conId, ledId)
            {
                try
                {
                    if(conId != '' && conId != null)
                    {
                        for(var i=1; i<52 ; i++)
                        {
                            var j = i+1;
                            var tempParam1 = 'param'+i+conId;
                            var tempParam2 = 'param'+j+conId;
                            // unchecking adjacent radio button
                            if(document.getElementById(tempParam1) != null)  
                            {
                                document.getElementById(tempParam1).checked = false; 
                            }
                            // checking current side radio button
                            if(document.getElementById(tempParam2) != null) 
                            {
                                document.getElementById(tempParam2).checked = true; 
                            }
                            i++;
                        }
                        // calling an action function to bind contact data selected
                        reFillMapToUpdate(conId, 'Capture');
                    }
                    else if(ledId != '' && ledId != null)
                    {
                        for(var i=1; i<52 ; i++)
                        {
                            var j = i+1;
                            var tempParam1 = 'param'+i+ledId;
                            var tempParam2 = 'param'+j+ledId;
                            // unchecking adjacent radio button
                            if(document.getElementById(tempParam1) != null)
                            {
                                document.getElementById(tempParam1).checked = false; 
                            }
                            // checking current side radio button
                            if(document.getElementById(tempParam2) != null)
                            {
                                document.getElementById(tempParam2).checked = true; 
                            }
                            i++;
                        }
                        // calling an action function to bind lead data selected
                        reFillMapToUpdate(ledId, 'Capture');
                    }
                    return false;
                }catch(e){} 
            }
            var curPopupWindow;
            var inputHiddenId ;
            var inputHiddenName ;
            var inputTextId ;
            var selectedCompany ;
            var selectedDataLName ;
            // Opens a lookup window to select account record
            function openRelatedPopup(dataLName, companyName, hiddnId, hiddenName)
            {
                try{
                inputHiddenId = hiddnId;
                inputHiddenName = hiddenName;
                selectedCompany = companyName;
                selectedDataLName = dataLName;
                url = "CaptureCustomLookup?ObjectName=Account" +
                                  "&FieldName=Name" +
                                  "&MatchingString=" ;
			    if(dataLName == 'Campaign'){
					url = "CaptureCustomLookup?ObjectName=Campaign&FieldName=Name&MatchingString=";
				}
				
				if(dataLName == 'User'){
					url = "CaptureCustomLookup?ObjectName=User&FieldName=Name&MatchingString=";
				}
				
                if(curPopupWindow == null)
                    openWind(url);
                else
                {
                    curPopupWindow.close();
                    curPopupWindow = null;
                    openWind(url);
                }
                }catch(e){}
            }
            function openWind(URL)
            {
                try{
                curPopupWindow  = window.open(URL, "_blank","width=700, height=400, dependent=no, toolbar=no, status=no, directories=no, menubar=no, scrollbars=1, resizable=no", true);
                }catch(e){}
            }
            // Called from custom lookup window and get values returned
            function setSelectedRelatedToDetails(objId, objName)
            {
                try{
                    document.getElementById(inputHiddenId).value = objId;
                    document.getElementById(inputHiddenName).value = objName;
                    curPopupWindow.close();
                    updateOption(selectedCompany, selectedDataLName);
                }catch(e){}
            }
            
            function accountChanged(idd, hiddenID)
            {
                try{
                document.getElementById(hiddenID).value =  document.getElementById(idd).value;
                rerenderSection();
                }catch(e){}             
            }