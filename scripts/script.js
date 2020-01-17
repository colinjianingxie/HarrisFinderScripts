jQuery(document).ready(function() {
              EditableTable.init();
    /*
    $("#exportpdf").click(function() {
        var doc = new jsPDF('landscape');
        //doc.autoTable({html: '#editable-sample'});
        doc.autoTable({
            html: '#editable-sample',
            startY: false, 
            theme: 'grid',  
            tableWidth: 'auto', 
            columnWidth: 'wrap', 
            showHeader: 'everyPage',
            tableLineColor: 200, 
            tableLineWidth: 0,
            columnStyles: {
            0: {columnWidth: 10}, 1: {columnWidth: 25}, 2: {columnWidth: 75}, 3: 
                {columnWidth: 50}, 4: {columnWidth: 50},
            5: {columnWidth: 'auto'}, 6: {columnWidth: 50}, 7: {columnWidth: 50}, 8: 
                {columnWidth: 'auto'}
            },
            headerStyles: {theme: 'grid'},
            styles: {overflow: 'linebreak', columnWidth: 'wrap',  
            fontSize: 10, 
            cellPadding: 8, overflowColumns: 'linebreak'},
        });
        doc.save('table.pdf');
    });

    */
    
    //good one
    /*
    $("#exportpdf").click(function() {


            //var pdf = new jsPDF('p', 'pt', 'ledger');
            var pdf = new jsPDF('p', 'pt');
            // source can be HTML-formatted string, or a reference
            // to an actual DOM element from which the text will be scraped.
            source = $('#editable-sample')[0];


            // we support special element handlers. Register them with jQuery-style 
            // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
            // There is no support for any other type of selectors 
            // (class, of compound) at this time.
            specialElementHandlers = {
                // element with id of "bypass" - jQuery style selector
                '#bypassme' : function(element, renderer) {
                    // true = "handled elsewhere, bypass text extraction"
                    return true
                }
            };
            margins = {
                top : 80,
                bottom : 60,
                left : 60,
                width : 522
            };
            // all coords and widths are in jsPDF instance's declared units
            // 'inches' in this case
            pdf.fromHTML(source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top, { // y coord
                'width' : margins.width, // max width of content on PDF
                'elementHandlers' : specialElementHandlers
            },

            function(dispose) {
                // dispose: object with X, Y of the last line add to the PDF 
                //          this allow the insertion of new lines after html
                pdf.save('output.pdf');
            }, margins);
    });
    */

    $("#exportpdf").click(function() {
       

            var doc = new jsPDF('l', 'mm', "a0");

            source = $('#editable-sample')[0];

            /*
            col: 0: uid
            col: 1: url
            col: 2: text
            col: 3: money tag
            col: 4: location tag
            col: 5: org tag
            col: 6: person tag
            col: 7: comments
            col: 8: edit
            col: 9: delete
            col: 10: favorite
            */
        
            doc.autoTable({
                html: '#editable-sample',
                startY: false, 
                theme: 'grid',  
                tableWidth: 'auto', 
                columnWidth: 'wrap', 
                showHeader: 'everyPage',
                tableLineColor: 200, 
                tableLineWidth: 0,
                columnStyles: {
                0: {columnWidth: 15}, 1: {columnWidth: 75}, 2: {columnWidth: 'auto'}, 3: 
                    {columnWidth: 50}, 4: {columnWidth: 50},
                5: {columnWidth: 'auto'}, 6: {columnWidth: 50}, 7: {columnWidth: 'auto'}, 8: 
                    {columnWidth: 10}, 9: {columnWidth: 10}, 10: {columnWidth: 10}
                },
                headerStyles: {theme: 'grid'},
                styles: {overflow: 'linebreak', columnWidth: 'wrap',  
                fontSize: 10, 
                cellPadding: 8, overflowColumns: 'linebreak'},
            });
            doc.save('output.pdf');


      

    });

});
