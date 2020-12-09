$(document).ready(function () {
		ClassicEditor
			.create( document.querySelector( '#editor' ), {
	            heading: {
	                options: [
	                    { model: 'paragraph', title: 'Обычный текст', class: 'ck-heading_paragraph' },
	                    { model: 'heading1', view: 'h1', title: 'Заголовок 1', class: 'ck-heading_heading1' },
	                    { model: 'heading2', view: 'h2', title: 'Заголовок 2', class: 'ck-heading_heading2' }
	                ]
	            },
	            height: '300px',
	            removePlugins: [ 'Link' ],
	            } )	
			.then( editor => {
				window.editor = editor;
				window.editor.setData()
			} )
			.catch( err => {
				console.error( err.stack );
	        } );
		ClassicEditor
			.create( document.querySelector( '#subtitle' ), {
	            heading: {
	                options: [
	                    { model: 'paragraph', title: 'Обычный текст', class: 'ck-heading_paragraph' },
	                    { model: 'heading1', view: 'h1', title: 'Заголовок 1', class: 'ck-heading_heading1' },
	                    { model: 'heading2', view: 'h2', title: 'Заголовок 2', class: 'ck-heading_heading2' }
	                ]
	            },
	            height: '300px',
	            removePlugins: [ 'Link' ],
	            } )	
			.then( subtitle => {
				window.subtitle = subtitle;
				window.subtitle.setData()
			} )
			.catch( err => {
				console.error( err.stack );
	        } );
}) 
