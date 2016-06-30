(function() {
	'use strict';

	var Zoom = Darkroom.Transformation.extend({
		applyTransformation: function(canvas, image, next) {

			// canvas.setHeight(canvas.getHeight() * this.options.factor);
			// canvas.setWidth(canvas.getWidth() * this.options.factor);
debugger;
			
			// var scaleX = image.scaleX;
			// var scaleY = image.scaleY;
			// var left = image.left;
			// var top = image.top;

			// var tempScaleX = this.currentFactor;
			// var tempScaleY = this.currentFactor;
			// var tempLeft = left * this.options.factor;
			// var tempTop = top * this.options.factor;

			image.scaleX = this.options.factor;
			image.scaleY = this.options.factor;
			// image.left = Number(tempLeft.toFixed(2));
			// image.top = Number(tempTop.toFixed(2));
			

			var width, height;
			height = image.getHeight();
			width = image.getWidth();

			canvas.setWidth(width);
			canvas.setHeight(height);


			canvas.centerObject(image);
			image.setCoords();
			canvas.renderAll();
			
			canvas.calcOffset();

			next(image);
		}
	});

	Darkroom.plugins['zoom'] = Darkroom.Plugin.extend({

		
		defaults: {
			// min crop dimension
			factor: 1,
			step: 0.2
		},

		initialize: function InitDarkroomZoomPlugin() {
			var buttonGroup = this.darkroom.toolbar.createButtonGroup();

			var leftButton = buttonGroup.createButton({
				image: 'zoom-in'
			});

			var rightButton = buttonGroup.createButton({
				image: 'zoom-out'
			});

			leftButton.addEventListener('click', this.zoomIn.bind(this));
			rightButton.addEventListener('click', this.zoomOut.bind(this));

			this.currentFactor = 1;
		},

		zoomIn: function zoomIn() {
			this.zoom(Number(this.currentFactor) + this.options.step);
		},

		zoomOut: function zoomOut() {
			this.zoom(Number(this.currentFactor) - this.options.step);
		},

		zoom: function zoom(factor) {
			this.currentFactor = Number(Number(factor).toFixed(2));

			this.darkroom.applyTransformation(
				new Zoom({factor: factor})
			);
		}



	});

})();