
/* variables locales de T_IBKUXMESCVJBK_962*/

/* variables locales de T_IBKUXWHYQSTBY_677*/

/* variables locales de T_IBKUXGBFAFFLD_706*/

/* variables locales de T_IBKUXHVPGJTGZ_132*/

    "use strict";

    /*global designerEvents, console */

        //*********** COMENTARIOS DE AYUDA **************
        //  Para imprimir mensajes en consola
        //  console.log("executeCommand");

        //  Para enviar mensaje use
        //  eventArgs.commons.messageHandler.showMessagesInformation('Ejecutando comando personalizado');

        //  Para evitar que se continue con la validación a nivel de servidor
        //  eventArgs.commons.execServer = false;

        //**********************************************************
        //  Eventos de VISUAL ATTRIBUTES
        //**********************************************************

    
        var task = designerEvents.api.compositehome;
    

    //"TaskId": "T_IBKUXMESCVJBK_962"


    	IBKUX.SYSTEM.importScript('DetailGrid.js');
task.initData.VC_COMPOSITHE_383962 = function (entities, initDataEventArgs) {
	try {
		initDataEventArgs.commons.serverParameters.ResponseContact = true;
		initDataEventArgs.commons.serverParameters.ResponseAdvertising = true;
		initDataEventArgs.commons.serverParameters.FilterCurrency = true;        
        initDataEventArgs.commons.serverParameters.ResponseCurrency = true;    
		if (entities.FilterCurrency.currencyId == null) {
			entities.FilterCurrency.currencyId == 0;
		}
		initDataEventArgs.commons.execServer = true;
        // $('#VC_ISANABZUSN_460701').addClass('hidden-xs');
	} catch (err) {
		IBKUX.MANAGER.ManagerException(err);
	}
};

	task.initDataCallback.VC_COMPOSITHE_383962 = function (entities, initDataCallbackEventArgs) {
    try {
        var one;
        initDataCallbackEventArgs.commons.execServer = false;
        var nav = initDataCallbackEventArgs.commons.api.navigation;
        nav.label = "Contactos";
        nav.customAddress = {
            id: "contacts",
            url: "/IBKUX/Common/Contact/views/contact.html",
            useMinification: false
        };
        nav.customDialogParameters = {};
        nav.scripts = [{
            module: "contacts",
            files: ["/IBKUX/Common/Contact/controller/contact.controller.js"]
        }];
        nav.registerCustomView('G_CONTACTSSS_860807');

        var nav = initDataCallbackEventArgs.commons.api.navigation;
        nav.label = "Advertencia";
        nav.customAddress = {
            id: "contacts",
            url: "/IBKUX/Common/advertising/views/advertising.html",
            useMinification: false
        };
        nav.customDialogParameters = {};
        nav.scripts = [{
            module: "contacts",
            files: ["/IBKUX/Common/advertising/controllers/advertising.js"]
        }];
        nav.registerCustomView('G_ADVERTISPI_266161');

        initDataCallbackEventArgs.commons.api.viewState.hide("G_CONSOLIEHC_407827");
        initDataCallbackEventArgs.commons.api.viewState.disable("VA_VAIMAGEBUTTONNN_893989");
        if (entities.ResponseCurrency.currencyid2 == 99) {
            initDataCallbackEventArgs.commons.api.viewState.hide("VA_3195LMGYSUNFCCQ_586989");
            initDataCallbackEventArgs.commons.api.viewState.hide("VA_4074UCJOXSCXHOT_383989");
        } else {
            if (entities.ResponseCurrency.currencyName1 != "99") {
                initDataCallbackEventArgs.commons.api.viewState.label("VA_3195LMGYSUNFCCQ_586989", entities.ResponseCurrency.currencyName1, false);
                entities.FilterCurrency.currencyId = entities.ResponseCurrency.currencyid1;
                one = true;
            } else {
                initDataCallbackEventArgs.commons.api.viewState.hide("VA_3195LMGYSUNFCCQ_586989");
                initDataCallbackEventArgs.commons.api.viewState.hide("VA_4074UCJOXSCXHOT_383989");
            }

            if (entities.ResponseCurrency.currencyName2 != "99") {
                initDataCallbackEventArgs.commons.api.viewState.label("VA_4074UCJOXSCXHOT_383989", entities.ResponseCurrency.currencyName2, false);
                if (!one || one == null) {
                    entities.FilterCurrency.currencyId = entities.ResponseCurrency.currencyid2;
                }
            } else {
                initDataCallbackEventArgs.commons.api.viewState.hide("VA_3195LMGYSUNFCCQ_586989");
                initDataCallbackEventArgs.commons.api.viewState.hide("VA_4074UCJOXSCXHOT_383989");
            }
            initDataCallbackEventArgs.commons.api.viewState.disable("VA_3195LMGYSUNFCCQ_586989");
        }
    } catch (err) {
        IBKUX.MANAGER.ManagerException(err);
    }
};


	task.render = function (entities, renderEventArgs) {
    try {
        renderEventArgs.commons.execServer = false;
        renderEventArgs.commons.api.grid.refresh('QV_7379_95780');
    } catch (err) {
        IBKUX.MANAGER.ManagerException(err);
    }
};

	task.change.VA_3195LMGYSUNFCCQ_586989 = function (entities, changedEventArgs) {
    try {
        changedEventArgs.commons.execServer = false;
        if ((changedEventArgs.oldValue == false || changedEventArgs.oldValue == null) && changedEventArgs.newValue == true) {            
            entities.FilterCurrency.currencyId = entities.ResponseCurrency.currencyid1;
            entities.ResponseCurrency.currency2 = false;
            entities.ResponseCurrency.currency1 = true;
            changedEventArgs.commons.api.viewState.disable("VA_3195LMGYSUNFCCQ_586989");
            changedEventArgs.commons.api.viewState.enable("VA_4074UCJOXSCXHOT_383989");
            changedEventArgs.commons.api.grid.refresh('QV_7379_95780');
        }
    } catch (err) {
        IBKUX.MANAGER.ManagerException(err);
    }
};

	task.change.VA_4074UCJOXSCXHOT_383989 = function (entities, changedEventArgs) {
    try {
        changedEventArgs.commons.execServer = false;
        if ((changedEventArgs.oldValue == false || changedEventArgs.oldValue == null) && changedEventArgs.newValue == true) {            
            entities.FilterCurrency.currencyId = entities.ResponseCurrency.currencyid2;
            entities.ResponseCurrency.currency1 = false;
            entities.ResponseCurrency.currency2 = true;
            changedEventArgs.commons.api.viewState.disable("VA_4074UCJOXSCXHOT_383989");
            changedEventArgs.commons.api.viewState.enable("VA_3195LMGYSUNFCCQ_586989");
            changedEventArgs.commons.api.grid.refresh('QV_7379_95780');
        }
    } catch (err) {
        IBKUX.MANAGER.ManagerException(err);
    }
};

	task.executeCommand.VA_VAIMAGEBUTTONNN_123989 = function (entities, executeCommandEventArgs) {
    try {
        executeCommandEventArgs.commons.execServer = false;
        executeCommandEventArgs.commons.api.viewState.hide("G_CONSOLICAR_608598");        
        executeCommandEventArgs.commons.api.viewState.hide("G_CONSOLIEHC_407827");
        executeCommandEventArgs.commons.api.viewState.disable("VA_VAIMAGEBUTTONNN_123989");
        executeCommandEventArgs.commons.api.viewState.enable("VA_VAIMAGEBUTTONNN_893989");
        executeCommandEventArgs.commons.api.viewState.enable("VA_VAIMAGEBUTTONNN_689989");
    } catch (err) {
        IBKUX.MANAGER.ManagerException(err);
    }
};

	task.executeCommand.VA_VAIMAGEBUTTONNN_689989 = function (entities, executeCommandEventArgs) {
    try {
        executeCommandEventArgs.commons.execServer = false;
        executeCommandEventArgs.commons.api.viewState.hide("G_CONSOLICAR_608598");
        executeCommandEventArgs.commons.api.grid.refresh('QV_7379_95780');
        executeCommandEventArgs.commons.api.viewState.show("G_CONSOLIEHC_407827");
        executeCommandEventArgs.commons.api.viewState.enable("VA_VAIMAGEBUTTONNN_123989");
        executeCommandEventArgs.commons.api.viewState.enable("VA_VAIMAGEBUTTONNN_893989");
        executeCommandEventArgs.commons.api.viewState.disable("VA_VAIMAGEBUTTONNN_689989");
    } catch (err) {
        IBKUX.MANAGER.ManagerException(err);
    }
};

	task.executeCommand.VA_VAIMAGEBUTTONNN_893989 = function (entities, executeCommandEventArgs) {
    try {
        executeCommandEventArgs.commons.execServer = false;
        executeCommandEventArgs.commons.api.viewState.hide("G_CONSOLIEHC_407827");
        executeCommandEventArgs.commons.api.grid.refresh('QV_7379_95780');
        executeCommandEventArgs.commons.api.viewState.show("G_CONSOLICAR_608598");
        executeCommandEventArgs.commons.api.viewState.enable("VA_VAIMAGEBUTTONNN_123989");
        executeCommandEventArgs.commons.api.viewState.disable("VA_VAIMAGEBUTTONNN_893989");
        executeCommandEventArgs.commons.api.viewState.enable("VA_VAIMAGEBUTTONNN_689989");
    } catch (err) {
        IBKUX.MANAGER.ManagerException(err);
    }
};

	var entry;

	task.showGridRowDetailIcon.QV_7379_95780 = function (entities, showGridRowDetailIconEventArgs) {
        try {
            return true;
        } catch (err) {
            IBKUX.MANAGER.ManagerException(err);
        }
    };

	task.executeCommand.VA_VAIMAGEBUTTONNN_765359 = function(entities,executeCommandEventArgs) {
    try {
        executeCommandEventArgs.commons.execServer = false;
        var tittle = "";
        var reportConfiguration = {
            module: 'IBKUX',
            name: 'ConsolidationPositionReport',
            downloadName : 'PosicionConsolidada',
            title: tittle,
            type: 'XLS',
            parameters : {
                REPORT_TITLE: tittle,
                type: 'XLS'
            }
        };
        downloadReport(reportConfiguration);
    } catch (err) {
    IBKUX.MANAGER.ManagerException(err);
    }
};

	// (Button) 
task.executeCommand.VA_VAIMAGEBUTTONNN_834359 = function(entities,executeCommandEventArgs) {
    try {
        executeCommandEventArgs.commons.execServer = false;
        var tittle = "";
        //Imprimir PDF
        var reportConfiguration = {
            module: 'IBKUX',
            name: 'ConsolidationPositionReport', 
            title: tittle,
            type: 'PDF',
            screen: {
                height: screen.height,
                width: screen.width
            },
            parameters : {
                REPORT_TITLE: tittle,
                type: 'PDF',
            }
        };
        angular.element(document).injector().get('container.reportingService').showOnPopup(reportConfiguration);
    } catch (err) {
    IBKUX.MANAGER.ManagerException(err);
    }
};

	task.executeCommand.VA_VAIMAGEBUTTONNN_898359 = function(entities,executeCommandEventArgs) {
       try {
        executeCommandEventArgs.commons.execServer = false;
           
        if (eye==undefined)
            eye = true;
        else 
            eye = !eye;
           
        
        $('#QV_7379_95780 .field-2').toggleClass('cb-hide-text');
        $('#QV_4103_51287 .field-2').toggleClass('cb-hide-text');
    } catch (err) {
        IBKUX.MANAGER.ManagerException(err);
    }
};

	task.executeCommand.VA_VAIMAGEBUTTONNN_906359 = function(entities,executeCommandEventArgs) {
     try {
        executeCommandEventArgs.commons.execServer = false;
        var tittle = "";
        //Imprimir PDF
        var reportConfiguration = {
            module: 'IBKUX',
            name: 'ConsolidationPositionReport',            
            title: tittle,
            type: 'PDF',
            screen: {
                height: screen.height,
                width: screen.width
            },
            parameters : {
                REPORT_TITLE: tittle,
                type: 'PDF',
            }
        };       
        angular.element(document).injector().get('container.reportingService').showOnPopup(reportConfiguration);
        } catch (err) {
            IBKUX.MANAGER.ManagerException(err);
        }        
};

	task.executeQuery.Q_RESPONUR_7379 = function(executeQueryEventArgs){
    try {
        executeQueryEventArgs.commons.execServer = true;
        executeQueryEventArgs.commons.serverParameters.FilterCurrency = true;
    } catch (err) {
        IBKUX.MANAGER.ManagerException(err);
    }
};

	task.executeQueryCallback.Q_RESPONUR_7379 = function(entities, executeQueryCallbackEventArgs) {
    try {
        loadConsolidateGraphic(entities, executeQueryCallbackEventArgs,'G_CONSOLICAR_608598', false);
		loadConsolidateGraphic2(entities, executeQueryCallbackEventArgs,'G_CONSOLIEHC_407827', false);
    } catch (err) {
        IBKUX.MANAGER.ManagerException(err);
    }
};

	task.gridInitColumnTemplate.QV_7379_95780 = function (idColumn, gridInitColumnTemplateEventArgs) {
    try {
        if (idColumn === 'productId'){
            var options = {
                templateName: 'six-fields-2-4',
                columns: ['productName','accountingBalance','productAlias']
            };
            var template = gridInitColumnTemplateEventArgs.commons.api.vc.getGridTemplate(gridInitColumnTemplateEventArgs, options);
            return template;
        }
    } catch (err) {
        IBKUX.MANAGER.ManagerException(err);
    }
};

	task.gridInitEditColumnTemplate.QV_7379_95780 = function (idColumn, gridInitColumnTemplateEventArgs) {
       
    };

	task.gridInitDetailTemplate.QV_7379_95780 = function (entities,gridInitDetailTemplateEventArgs) {
    try{
        gridInitDetailTemplateEventArgs.commons.execServer = false;

        var apiNav= gridInitDetailTemplateEventArgs.commons.api.navigation;
        apiNav.address = {
            moduleId: "IBKUX",
            subModuleId: 'CNSLD',
            taskId: 'T_IBKUXSGJAWCHS_646',
            taskVersion: "1.0.0",
            viewContainerId: 'VC_DETAILPRUT_398646'};
        apiNav.queryParameters = { mode: 8 };

        apiNav.customDialogParameters = { data: gridInitDetailTemplateEventArgs.modelRow ,option:1, TaskId: gridInitDetailTemplateEventArgs.commons.api.vc.taskId, btnEye: eye};
        apiNav.openDetailTemplate("QV_7379_95780", gridInitDetailTemplateEventArgs.modelRow);
    } catch (err) {
        IBKUX.MANAGER.ManagerException(err);
    } 
};

	var eye;

	


