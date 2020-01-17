
var EditableTable = function () {

    return {

        //main function to initiate the module
        init: function () {
            function restoreRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                
                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable.fnUpdate(aData[i], nRow, i, false);
                }
                

                oTable.fnDraw();
            }

            function editRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                
/*                jqTds[0].innerHTML = '<input type="text" class="form-control small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<input type="text" class="form-control small" value="' + aData[1] + '">';
                jqTds[2].innerHTML = '<input type="text" class="form-control small" value="' + aData[2] + '">';
                jqTds[3].innerHTML = '<input type="text" class="form-control small" value="' + aData[3] + '">';
                jqTds[4].innerHTML = '<input type="text" class="form-control small" value="' + aData[4] + '">';
                jqTds[5].innerHTML = '<input type="text" class="form-control small" value="' + aData[5] + '">';
                jqTds[6].innerHTML = '<input type="text" class="form-control small" value="' + aData[6] + '">';*/
                
                
                jqTds[0].innerHTML = aData[0];
                jqTds[1].innerHTML = aData[1];
                jqTds[2].innerHTML = aData[2];
                jqTds[3].innerHTML = aData[3];
                jqTds[4].innerHTML = aData[4];
                jqTds[5].innerHTML = aData[5];
                jqTds[6].innerHTML = aData[6];
                
                jqTds[7].innerHTML = '<input type="text" id = "comment-text-box" class="form-control small" value="' + aData[7] + '">';
                jqTds[8].innerHTML = '<a class="edit" href="">Save</a>';
                jqTds[9].innerHTML = '<a class="cancel" href="">Cancel</a>';
                jqTds[10].innerHTML = aData[10];
            }



            function saveRow(oTable, nRow) {
                var jqInputs = $('#comment-text-box', nRow);
                var jqTds = $('>td', nRow);
                var stored_comment = '\n[' + jqTds[0].innerHTML + '] [' + jqInputs[0].value + ']';
                /*
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
                oTable.fnUpdate(jqInputs[5].value, nRow, 5, false);
                oTable.fnUpdate(jqInputs[6].value, nRow, 6, false);
                */
                //alert(jqInputs[0].value);
                oTable.fnUpdate(jqInputs[0].value, nRow, 7, false);

                oTable.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 8, false);
                oTable.fnUpdate('<a class="delete" href="">Delete</a>', nRow, 9, false);

            
                $.ajax({
                    type: 'POST',
                    url: "php/write_to_file.php",
                    data: {log_data: stored_comment},
                    success: function(result) {
                        console.log('the data was successfully sent to the server');
                    }
                });
                oTable.fnDraw();
            }

            function cancelEditRow(oTable, nRow) {
                var jqInputs = $('#comment-text-box', nRow);
                /*
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
                oTable.fnUpdate(jqInputs[5].value, nRow, 5, false);
                oTable.fnUpdate(jqInputs[6].value, nRow, 6, false);
                */
                oTable.fnUpdate(jqInputs[0].value, nRow, 7, false);
                oTable.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 8, false);
                oTable.fnDraw();
            }

            var oTable = $('#editable-sample').dataTable({

                "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 5,
                "sDom": "<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_ records per page",
                    "oPaginate": {
                        "sPrevious": "Prev",
                        "sNext": "Next"
                    }
                },
                "aoColumnDefs": [{
                        'bSortable': false,
                        'aTargets': [0]
                    }
                ],
                "aaSorting": []
            });

            jQuery('#editable-sample_wrapper .dataTables_filter input').addClass("form-control medium"); // modify table search input
            jQuery('#editable-sample_wrapper .dataTables_length select').addClass("form-control xsmall"); // modify table per page dropdown

            var nEditing = null;

            $('#editable-sample_new').click(function (e) {
                e.preventDefault();
                var aiNew = oTable.fnAddData(['', '', '', '', '', '', '', '',
                        '<a class="edit" href="">Edit</a>', '<a class="cancel" data-mode="new" href="">Cancel</a>', ''
                ]);
                var nRow = oTable.fnGetNodes(aiNew[0]);
                editRow(oTable, nRow);
                nEditing = nRow;
            });

            $('#editable-sample a.delete').live('click', function (e) {
                e.preventDefault();

                if (confirm("Are you sure to delete this row ?") == false) {
                    return;
                }

                var nRow = $(this).parents('tr')[0];
                oTable.fnDeleteRow(nRow);
                alert("Deleted!");
            });

            $('#editable-sample a.cancel').live('click', function (e) {
                e.preventDefault();
                if ($(this).attr("data-mode") == "new") {
                    var nRow = $(this).parents('tr')[0];
                    oTable.fnDeleteRow(nRow);
                } else {
                    restoreRow(oTable, nEditing);
                    nEditing = null;
                }
            });

            $('#editable-sample a.hi-lite').live('click', function (e) {
                e.preventDefault();
                var nRow = $(this).parents('tr')[0];
                var aData = oTable.fnGetData(nRow);

                //FOR MORE, just get item(1), item(3), etc...
                var textCell = nRow.cells.item(2);
                var highlightCell = nRow.cells.item(10);

                var jqTds = $('>td', nRow);
                var stored_log = "\n[" + jqTds[0].innerHTML + "] [<a class='un-hilite highlight-cell' href='javascript:;'>Undo</a>]";

                /*alert(aData[10]);*/




                //textCell.setAttribute("class", "result-text highlight-cell");
                //highlightCell.setAttribute("class", "highlight-cell");

                $.ajax({
                    type: 'POST',
                    url: "php/write_to_file.php",
                    data: {log_data: stored_log},
                    success: function(result) {
                        console.log('the data was successfully sent to the server');
                    }
                });


                aData[10] = "<a class='un-hilite highlight-cell' href='javascript:;'>Undo</a>";
                highlightCell.innerHTML =  "<a class='un-hilite highlight-cell' href='javascript:;'>Undo</a>";

            });
            $('#editable-sample a.un-hilite').live('click', function (e) {
                e.preventDefault();
                var nRow = $(this).parents('tr')[0];
                var aData = oTable.fnGetData(nRow);
                //FOR MORE, just get item(1), item(3), etc...
                var textCell = nRow.cells.item(2);
                var highlightCell = nRow.cells.item(10);
                //aData[10] = "un-highlight";

                var jqTds = $('>td', nRow);
                var stored_log = "\n[" + jqTds[0].innerHTML + "] [<a class='hi-lite' href='javascript:;'>Favorite</a>]";

        
                //highlightCell.setAttribute("class", "");
                //textCell.setAttribute("class", "result-text");

                $.ajax({
                    type: 'POST',
                    url: "php/write_to_file.php",
                    data: {log_data: stored_log},
                    success: function(result) {
                        console.log('the data was successfully sent to the server');
                    }
                });
                aData[10] = "<a class='hi-lite' href='javascript:;'>Favorite</a>";
                highlightCell.innerHTML = "<a class='hi-lite' href='javascript:;'>Favorite</a>";
            });

            $('#editable-sample a.edit').live('click', function (e) {
                e.preventDefault();

                /* Get the row as a parent of the link that was clicked on */
                var nRow = $(this).parents('tr')[0];

                if (nEditing !== null && nEditing != nRow) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                    restoreRow(oTable, nEditing);
                    editRow(oTable, nRow);
                    nEditing = nRow;
                } else if (nEditing == nRow && this.innerHTML == "Save") {
                    /* Editing this row and want to save it */

                    saveRow(oTable, nEditing);
                    nEditing = null;
                    //alert("Saved! WRITE A FUNCTION HERE to save!");
                } else {
                    /* No edit in progress - let's start one */
                    editRow(oTable, nRow);
                    nEditing = nRow;
                }
            });
        }

    };

}();