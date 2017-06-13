// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require tinymce
tinymce.init({
  selector: 'textarea',
  plugins: 'image code media',
  toolbar: 'undo redo | link image | code',
  // enable title field in the Image dialog
  image_title: true,
  // enable automatic uploads of images represented by blob or data URIs
  automatic_uploads: true,
  // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
  images_upload_url: 'postAcceptor.php',
  // here we add custom filepicker only to Image dialog
  file_picker_types: 'image media',
  // and here's our custom image picker
  file_picker_callback: function(cb, value, meta) {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '*/*');

    // Note: In modern browsers input[type="file"] is functional without
    // even adding it to the DOM, but that might not be the case in some older
    // or quirky browsers like IE, so you might want to add it to the DOM
    // just in case, and visually hide it. And do not forget do remove it
    // once you do not need it anymore.

    input.onchange = function() {
      var file = this.files[0];

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        // Note: Now we need to register the blob in TinyMCEs image blob
        // registry. In the next release this part hopefully won't be
        // necessary, as we are looking to handle it internally.
        var id = 'blobid' + (new Date()).getTime();
        var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
        var blobInfo = blobCache.create(id, file, reader.result);
        blobCache.add(blobInfo);

        // call the callback and populate the Title field with the file name
        cb(blobInfo.blobUri(), { title: file.name });
      };
    };

    input.click();
  }
});

// tinymce.init({
//     selector: 'textarea',
//     theme: 'modern',
//     paste_data_images: true,
//     plugins: [
//         "advlist autolink lists link image charmap print preview hr anchor pagebreak",
//         "searchreplace wordcount visualblocks visualchars code fullscreen",
//         "insertdatetime media nonbreaking save table contextmenu directionality",
//         "emoticons template paste textcolor colorpicker textpattern"
//     ],
//     toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
//     toolbar2: "print preview media | forecolor backcolor emoticons",
//     toolbar: 'media',
//     media_live_embeds: true,
//     image_advtab: true,
//     file_picker_types: 'image media',
//     video_template_callback: function(data) {
//         debugger
//    return '<video width="' + data.width + '" height="' + data.height + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls">\n' + '<source src="' + data.source1 + '"' + (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' />\n' + (data.source2 ? '<source src="' + data.source2 + '"' + (data.source2mime ? ' type="' + data.source2mime + '"' : '') + ' />\n' : '') + '</video>';
//  },
//     file_picker_callback: function(callback, value, meta) {
//         if (meta.filetype == 'image') {
//             $('#upload').trigger('click');
//             $('#upload').on('change', function() {
//                 var file = this.files[0];
//                 var reader = new FileReader();
//                 reader.onload = function(e) {
//                     callback(e.target.result, {
//                         alt: ''
//                     });
//                 };
//                 reader.readAsDataURL(file);
//             });
//         } else if (meta.filetype == 'media') {
//             $('#upload').trigger('click');
//                         $('#upload').on('change', function() {
//                 var file = this.files[0];
//                 var reader = new FileReader();
//                 reader.onload = function(e) {
//                     callback(e.target.result, {
//                        alt: ''
//                     });
//                 };
//                 reader.readAsDataURL(file);
//             });
//         }
//     },
//     templates: [{
//       title: 'Test template 1',
//       content: 'Test 1'
//     }, {
//       title: 'Test template 2',
//       content: 'Test 2'
//     }]

// });
