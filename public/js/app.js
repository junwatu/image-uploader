var updateImage = function () {
  var dataSource = new kendo.data.DataSource({
    transport: {
      read: {
        url: 'http://localhost:5005/service/images',
        dataType: 'json'
      }
    },
    pageSize: 21
  })

  $('#pager').kendoPager({
    dataSource: dataSource
  })

  $('#listView').kendoListView({
    dataSource: dataSource,
    template: kendo.template($('#template').html())
  })
}

Dropzone.options.mydropzone = {
  init: function () {
    this.on("complete", function(file) {
      updateImage()
    })
  },
  maxFileSize : 2,
  acceptedFiles: 'image/*'
}
 updateImage()