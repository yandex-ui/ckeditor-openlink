(function() {
    'use strict';

    var REG_HREF = /^http(s?):\/\//;

    CKEDITOR.plugins.add('openlink', {
        modes: { 'wysiwyg': 1 },

        init: function(editor) {
            editor.on('contentDom', this.onContentDom);
        },

        onContentDom: function() {
            this.editable().on('click', this.plugins.openlink.onClick, this, null, 0);
        },

        onClick: function(event) {
            var selection = this.getSelection();
            if (!selection) {
                return;
            }

            var range = selection.getRanges()[ 0 ];
            if (!range ||
                !range.collapsed ||
                range.checkEndOfBlock() ||
                range.checkStartOfBlock()) {

                return;
            }

            var nativeEvent = event.data.$;
            var path = new CKEDITOR.dom.elementPath(new CKEDITOR.dom.element(nativeEvent.target), range.root);

            var link = path.contains('a', true);
            if (!link) {
                return;
            }

            var href = link.getAttribute('href');
            if (!href || !REG_HREF.test(href)) {
                return;
            }

            event.stop();
            setTimeout(function() {
				window.open(href, '_blank');
			}, 0);
        }
    });
}());
