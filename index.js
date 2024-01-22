(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib._3DSMAXLOGO = function() {
	this.initialize(img._3DSMAXLOGO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1000,1000);


(lib.AFTEREFFECTSLOGO = function() {
	this.initialize(img.AFTEREFFECTSLOGO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1781,1739);


(lib.BLENDERLOGO = function() {
	this.initialize(img.BLENDERLOGO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2503,2047);


(lib.COMDES = function() {
	this.initialize(img.COMDES);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1920,1080);


(lib.BG = function() {
	this.initialize(img.BG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1920,1080);


(lib.KRUACADEMYLOGO = function() {
	this.initialize(img.KRUACADEMYLOGO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,463,232);


(lib.KRUpngcopy = function() {
	this.initialize(img.KRUpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1920,1080);


(lib.ILLUSTRATORLOGO = function() {
	this.initialize(img.ILLUSTRATORLOGO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3840,2399);


(lib.ANIMATELOGO = function() {
	this.initialize(img.ANIMATELOGO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,866,650);


(lib.UPSI = function() {
	this.initialize(img.UPSI);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1920,1080);


(lib.FAIERUZMAIN = function() {
	this.initialize(img.FAIERUZMAIN);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1920,1080);


(lib.PHOTOSHOPLOGO = function() {
	this.initialize(img.PHOTOSHOPLOGO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1200,1170);


(lib.LIGHTROOMLOGO = function() {
	this.initialize(img.LIGHTROOMLOGO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2101,2052);


(lib.faieruz3 = function() {
	this.initialize(img.faieruz3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1920,1080);


(lib.PREMIEREPROLOGO = function() {
	this.initialize(img.PREMIEREPROLOGO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,2926);


(lib.TOONIGHTLOGO = function() {
	this.initialize(img.TOONIGHTLOGO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3309,2512);


(lib.UPSILOGO = function() {
	this.initialize(img.UPSILOGO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1920,1080);


(lib.TOONBOOMLOGO = function() {
	this.initialize(img.TOONBOOMLOGO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1599,721);


(lib.UPSI_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.UPSI();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1920,1080);


(lib.Tween35 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.BG();
	this.instance.setTransform(-960,-540);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-960,-540,1920,1080);


(lib.Tween34 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.faieruz3();
	this.instance.setTransform(-738.8,-415.55,0.7696,0.7696);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-738.8,-415.5,1477.6,831.1);


(lib.Tween33 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EiWKAaMMAAAg0XMEsVAAAMAAAA0Xg");
	this.shape.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-961.1,-167.6,1922.3000000000002,335.29999999999995);


(lib.Tween32 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000066").s().p("AhPEzIAAplICfAAIAAJlg");
	this.shape.setTransform(466.575,0.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000066").s().p("ABrEzIAAmeIg4GeIhiAAIg6mUIgBGUIiLAAIAAplIDOAAQAJA3AKBMIAWCbIAkkeIDQAAIAAJlg");
	this.shape_1.setTransform(427.575,0.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000066").s().p("AiSEzIAAhZIB7mRIhtAAIAAh7IEXAAIAAB7Ih3FvIB3AAIAAB7g");
	this.shape_2.setTransform(384.125,0.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000066").s().p("AAmEzIgIhvIg4AAIgKBvIilAAIBRplIDmAAIBcJlgAgcBYIA2AAQgMhogNiZQgXCvgGBSg");
	this.shape_3.setTransform(347.275,0.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000066").s().p("Ai4EzIAAplIB4AAQByAAApAKQApALAVAYQAVAZAGAdQAFAeAABXIAADWQAABTgIAcQgIAcgTAQQgTAQgdAGQgcAGg5AAgAgYDKQAhAAAIgOQAIgOAAg9IAAjuQAAgpgCgNQgDgLgKgGQgJgFgZAAg");
	this.shape_4.setTransform(292.575,0.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000066").s().p("AAYEzIAAkCIgvAAIAAECIifAAIAAplICfAAIAADcIAvAAIAAjcICfAAIAAJlg");
	this.shape_5.setTransform(249.35,0.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000066").s().p("AhYEwQgngRgYgfQgYghgEgmQgFglAAhgIAAhoQAAhcAFgmQAEgnAXggQAXggAngRQAngRAzAAQAxAAAoARQAnAPAYAhQAXAfAFAnQAFAlAABfIAABoQAABdgFAnQgEAmgXAgQgXAggnARQgnARg0AAQgxAAgngQgAgRjNQgHAJAAAwIAAEeQAAA1AEANQAEAMAQAAQAQAAAEgOQAFgPAAg2IAAkZQAAgrgFgMQgFgMgOAAQgMAAgGAKg");
	this.shape_6.setTransform(206.525,0.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000066").s().p("ABrEzIAAmeIg4GeIhiAAIg6mUIgBGUIiLAAIAAplIDOAAQAJA3AKBMIAWCbIAkkeIDQAAIAAJlg");
	this.shape_7.setTransform(157.475,0.25);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000066").s().p("AAmEzIhSkXIAAEXIiFAAIAAplICFAAIBZEVIAAkVICFAAIAAJlg");
	this.shape_8.setTransform(94.925,0.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000066").s().p("AhPEzIAAplICfAAIAAJlg");
	this.shape_9.setTransform(62.725,0.25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000066").s().p("Ai5EzIAAplICfAAQBLAAAnALQAnANAYAjQAXAkAABQQAAA2gQAVQgRAVgyAMQA3AMAUAcQAUAdAAA8IAAA5QAAA+gOAeQgPAegfALQgfALhfAAgAgZDKQAhgBAJgJQAJgKAAgmIAAg4QAAgogIgIQgJgJgigBgAgZhBIAQAAQAWAAAHgLQAGgMAAg3QAAgdgFgLQgFgMgJgDQgIgDgYAAg");
	this.shape_10.setTransform(30.375,0.25);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000066").s().p("AiSEzIAAhZIB7mRIhtAAIAAh7IEXAAIAAB7Ih3FvIB3AAIAAB7g");
	this.shape_11.setTransform(-20.725,0.25);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000066").s().p("AhaEnQgqgSgVgdQgVgegEggQgEghAAhnIAAlqICgAAIAAHLQAAAoAFAMQAEAKANABQAOgBAFgMQAEgMAAguIAAnDICgAAIAAGZQAABGgFAcQgEAcgXAeQgWAdglAQQgkAPgyAAQg2AAgqgSg");
	this.shape_12.setTransform(-57.175,0.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000066").s().p("AAeEzIAAjMQAAgxgIgMQgIgMggAAIAAEVIifAAIAAplIBxAAQBwAAAoAIQAoAJAZAkQAZAkAABPQAABHgSAZQgRAYg1AGQAwALAQATQAQATAEARQAEARAABKIAACigAgShBQAaABALgIQALgHAAgpIAAgiQAAgdgKgJQgLgJgbAAg");
	this.shape_13.setTransform(-99.225,0.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000066").s().p("AiKEzIAAplIEKAAIAAB7IhrAAIAAB0IBkAAIAAB0IhkAAIAACHIB2AAIAAB7g");
	this.shape_14.setTransform(-135.45,0.25);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000066").s().p("AhPEzIAAplICfAAIAAJlg");
	this.shape_15.setTransform(-163.725,0.25);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000066").s().p("AAmEzIgIhvIg4AAIgKBvIilAAIBRplIDmAAIBcJlgAgcBYIA2AAQgMhogNiZQgXCvgGBSg");
	this.shape_16.setTransform(-194.575,0.25);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000066").s().p("AiGEzIAAplIENAAIAAB7IhvAAIAAB0IBjAAIAAB0IhjAAIAAECg");
	this.shape_17.setTransform(-226.975,0.25);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000066").s().p("Ai4EzIAAplIB4AAQByAAApAKQApALAVAYQAVAZAGAdQAFAeAABXIAADWQAABTgIAcQgIAcgTAQQgTAQgdAGQgcAGg5AAgAgYDKQAhAAAIgOQAIgOAAg9IAAjuQAAgpgCgNQgDgLgKgGQgJgFgZAAg");
	this.shape_18.setTransform(-278.625,0.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000066").s().p("AAmEzIgIhvIg4AAIgKBvIilAAIBRplIDmAAIBcJlgAgcBYIA2AAQgMhogNiZQgXCvgGBSg");
	this.shape_19.setTransform(-320.025,0.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000066").s().p("ABrEzIAAmeIg4GeIhiAAIg6mUIgBGUIiLAAIAAplIDOAAQAJA3AKBMIAWCbIAkkeIDQAAIAAJlg");
	this.shape_20.setTransform(-367.575,0.25);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000066").s().p("AAYEzIAAkCIgvAAIAAECIifAAIAAplICfAAIAADcIAvAAIAAjcICgAAIAAJlg");
	this.shape_21.setTransform(-417,0.25);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000066").s().p("AAmEzIgIhvIg4AAIgKBvIilAAIBRplIDmAAIBcJlgAgcBYIA2AAQgMhogNiZQgXCvgGBSg");
	this.shape_22.setTransform(-458.225,0.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-480.5,-49.9,961,99.8);


(lib.Tween31 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000066").s().p("AgFDhIAAhPIiFAAIAAhNIBhklICUAAIAAElIAgAAIAABNIggAAIAABPgAg2BFIAxAAIAAi/g");
	this.shape.setTransform(266.25,0.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000066").s().p("AhLDhIBPlwIhuAAIAAhRIDVAAIAABiIhHFfg");
	this.shape_1.setTransform(241.875,0.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000066").s().p("AgEDhIAAhPIiGAAIAAhNIBhklICUAAIAAElIAgAAIAABNIggAAIAABPgAg2BFIAyAAIAAi/g");
	this.shape_2.setTransform(217.6,0.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000066").s().p("AhNDbQgegQgNgbQgOgcAAgqIBxAAQAAAfAAAIQABAIAHAGQAFAGAKAAQAIAAAFgGQAGgFABgJIABghIAAhIQgJASgQAJQgQAJgZAAQgfAAgYgQQgXgRgHgYQgGgWAAgoIAAgkQAAgvAEgXQAEgXAPgTQAQgVAcgLQAbgKAlAAQArAAAdANQAdAMAQAYQAQAXACAaQADAZAABLIAAA9QAABRgCAbQgDAbgRAZQgQAYgeAMQgdAMgmAAQgvAAgegPgAgNicQgJAGABAfIAABVQAAAcAHAGQAHAGAHAAQAMAAAFgHQAGgIAAgZIAAhSQAAgdgGgKQgFgJgMAAQgGAAgHAIg");
	this.shape_3.setTransform(188,0.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000066").s().p("Ag8DhQgbgKgPgUQgQgTgHgWQgHgWAAgwIAAicQAAg+ALgfQALgfAggSQAfgTAuAAQAkAAAdANQAdANAPATQAOASAFAYQAGAXAAAzIAACVQAAA0gGAXQgGAXgRAVQgSAUgYAJQgZAJgfAAQgnAAgbgJgAgPiaQgEAKAAAiIAADbQAAAnAEAJQADAIAMAAQAMAAAEgKQAEgJAAghIAAjfQAAgkgDgIQgEgKgNAAQgLAAgEAKg");
	this.shape_4.setTransform(157.225,0.225);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000066").s().p("AgRDhIAAjwQABg1gDgKQgDgLgLgFQgLgGgnAAIgLAAIAAg0QBRgSApg2IBDAAIAAHBg");
	this.shape_5.setTransform(130.1,0.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000066").s().p("AhNDbQgegQgNgbQgOgcAAgqIBxAAQAAAfABAIQAAAIAGAGQAGAGAJAAQAJAAAGgGQAFgFABgJIABghIAAhIQgJASgPAJQgRAJgZAAQgfAAgYgQQgXgRgGgYQgHgWAAgoIAAgkQAAgvAEgXQADgXAQgTQAPgVAcgLQAcgKAlAAQAsAAAdANQAdAMAPAYQAQAXADAaQACAZAABLIAAA9QAABRgCAbQgDAbgQAZQgSAYgdAMQgdAMgmAAQgvAAgegPgAgOicQgHAGAAAfIAABVQgBAcAIAGQAHAGAHAAQALAAAHgHQAEgIABgZIAAhSQgBgdgEgKQgFgJgNAAQgGAAgIAIg");
	this.shape_6.setTransform(104.9,0.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000066").s().p("AhODaQgegQgMgaQgNgaAAg9QAAgpAHgeQAGgdAhgSQgVgKgKgWQgLgWAAgiQAAg6AggdQAhgdBAAAQBJAAAdAfQAcAfAAA5QAAAlgJAQQgKAQgdAQQAZAKANATQAOAUAABKQAAA3gLAaQgKAagfAQQgfARgzAAQgxAAgdgQgAgPAaQgFAIAAAaIAAA7QAAAdAFAIQAFAJALAAQAMAAAEgJQAEgIAAgeIAAg6QAAgagFgIQgFgJgLAAQgLAAgEAJgAgOicQgEAIAAAWIAAAiQAAAUAEAIQAFAIAJAAQALAAAEgHQAEgIAAgYIAAgfQAAgXgEgHQgEgIgLAAQgKAAgEAIg");
	this.shape_7.setTransform(74.175,0.225);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000066").s().p("AgQDhIAAjwQgBg1gCgKQgCgLgMgFQgLgGgnAAIgLAAIAAg0QBSgSApg2IBCAAIAAHBg");
	this.shape_8.setTransform(47.1,0.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000066").s().p("Ag8DhQgbgKgPgUQgQgTgHgWQgHgWAAgwIAAicQAAg+ALgfQALgfAggSQAfgTAuAAQAkAAAdANQAdANAPATQAOASAFAYQAGAXAAAzIAACVQAAA0gGAXQgGAXgRAVQgSAUgYAJQgZAJgfAAQgnAAgbgJgAgPiaQgEAKAAAiIAADbQAAAnAEAJQADAIAMAAQAMAAAEgKQAEgJAAghIAAjfQAAgkgDgIQgEgKgNAAQgLAAgEAKg");
	this.shape_9.setTransform(21.975,0.225);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000066").s().p("AhEDdQgdgMgQgYQgQgXgCgaQgDgaAAhKIAAg9QAAhRADgbQACgcARgYQAQgYAegMQAegMAlAAQAvAAAeAPQAfAQANAbQANAcAAAqIhwAAIgBgnQgBgJgGgFQgGgGgJAAQgJAAgFAGQgGAFgBAJIAAAhIAABIQAIgSAQgJQAQgJAZAAQAfAAAXAQQAYARAHAYQAGAWAAAoIAAAkQAAAvgDAXQgEAXgQAUQgPATgcAMQgbAKglAAQgsAAgdgNgAgQACQgFAIAAAZIAABSQAAAdAFAKQAFAJALAAQAHAAAIgHQAHgIABgfIAAhUQAAgYgGgJQgFgIgMAAQgLABgFAHg");
	this.shape_10.setTransform(-8.65,0.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000066").s().p("AgiCGIAAhkIhjAAIAAhDIBjAAIAAhkIBDAAIAABkIBlAAIAABDIhlAAIAABkg");
	this.shape_11.setTransform(-39.35,0.225);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000066").s().p("AgqCTIAAhcIBVAAIAABcgAgqg2IAAhcIBVAAIAABcg");
	this.shape_12.setTransform(-69.9,8.075);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000066").s().p("Ag6DhIAAlnIhFAAIAAhaID/AAIAABaIhFAAIAAFng");
	this.shape_13.setTransform(-89.3,0.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000066").s().p("AhTDYQghgTgKggQgMgiAAhCIAAiCQAAgxAEgYQADgZARgWQAQgXAegNQAdgNAmAAQAzAAAhAUQAjAUAKAeQAKAeAAA/IAAArIh1AAIAAhOQAAgjgDgIQgEgJgNAAQgOAAgDALQgFAKAAAiIAADRQAAAgAFAKQADAKANAAQANAAAFgKQADgKAAglIAAg4IB1AAIAAARQABBGgLAeQgKAdghAWQgiAWgxAAQgzAAgigTg");
	this.shape_14.setTransform(-118.15,0.225);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000066").s().p("AAcDhIgGhRIgpAAIgHBRIh5AAIA7nBICpAAIBDHBgAgUBAIAnAAQgJhLgJhxQgRCBgEA7g");
	this.shape_15.setTransform(-148.45,0.225);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000066").s().p("Ag6DhIAAlnIhFAAIAAhaID/AAIAABaIhFAAIAAFng");
	this.shape_16.setTransform(-173.8,0.225);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000066").s().p("AAcDhIg8jNIAADNIhiAAIAAnBIBiAAIBBDLIAAjLIBiAAIAAHBg");
	this.shape_17.setTransform(-202.375,0.225);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000066").s().p("AhADfQgdgMgRgYQgSgXgDgcQgDgcgBhFIAAhNQABhDADgdQADgcARgXQAQgYAegMQAcgNAlAAQAkAAAdAMQAdAMASAYQARAXAEAcQACAcAABFIAABNQAABDgCAdQgEAcgQAXQgSAYgcAMQgdANgmAAQgjAAgdgMgAgMiWQgGAHAAAiIAADSQABAnADAJQADAJALAAQAMAAADgKQAEgLgBgnIAAjPQABgfgEgJQgDgJgMAAQgHAAgFAIg");
	this.shape_18.setTransform(-233.4,0.225);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000066").s().p("AhTDYQghgTgLggQgLgiAAhCIAAiCQABgxADgYQADgZARgWQAQgXAegNQAdgNAmAAQAzAAAiAUQAhAUALAeQALAeAAA/IAAArIh1AAIAAhOQAAgjgFgIQgDgJgNAAQgNAAgFALQgEAKAAAiIAADRQAAAgAEAKQAFAKAMAAQANAAAEgKQAFgKAAglIAAg4IB1AAIAAARQgBBGgJAeQgKAdgiAWQgiAWgxAAQgzAAgigTg");
	this.shape_19.setTransform(-264.7,0.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-282.4,-36.6,564.9,73.30000000000001);


(lib.Tween30 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000066").s().p("AhAB+IAAg1IA5iTIg0AAIAAgzIB8AAIAAA4Ig4CQIA4AAIAAAzg");
	this.shape.setTransform(370.375,62.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000066").s().p("Ag+B6QgMgGgFgKQgGgKgBgLQgBgLAAghIAAioIBMAAIAACqQAAAdACAGQACAFAHABQAIgBACgFQACgGAAgfIAAioIBMAAIAAD6IhOAAIACgUQgIANgLAFQgMAHgPAAQgRAAgLgGg");
	this.shape_1.setTransform(353.425,62.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000066").s().p("Ag8CAIAAj6IBMAAIgEAgQARgjAggCIAABYQgVABgKAFQgJAGgDAKQgCAKAAAkIAABjg");
	this.shape_2.setTransform(336.9,62.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000066").s().p("AgoB7QgSgHgKgMQgLgMgEgPQgEgPAAgcIAAhIQAAghAJgTQAJgTAUgKQAVgKAaAAQAfAAAVAMQAVAMAIAUQAJAUAAAlIAAAgIhiAAIAAA3QAAARACAFQADAFAGAAQAIAAADgHQADgGAAgTIAAghIBJAAIAAASQAAAYgDAMQgDANgLAOQgLAOgQAHQgRAHgZAAQgXAAgTgHgAgIhQQgCAFAAAVIAAASIAVAAIAAgSQAAgTgCgGQgCgGgHAAQgHAAgBAFg");
	this.shape_3.setTransform(319.575,62.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000066").s().p("AgnCZIAAj6IBOAAIAAD6gAgnhwIAAgpIBOAAIAAApg");
	this.shape_4.setTransform(304.3,59.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000066").s().p("AhFB3QgQgLgBgmIAAgVQAAgcAJgKQAKgLAjgMQAkgPADgFQADgFAAgQQAAgUgDgGQgDgGgGAAQgIAAgCAFQgCAFAAAVIAAAbIhIAAIAAgRQAAgdAIgQQAGgQAVgMQAUgMAfAAQAnAAATAOQAVANAEAUQADAUAAA+IAAB+IhKAAIAAgXQgHAOgKAGQgMAHgPAAQgTAAgSgLgAgLAdQgDAJAAARQABATACAGQACAGAJAAQAFAAADgFQACgEAAgTIAAg0QgRAOgEAJg");
	this.shape_5.setTransform(289.1,62.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000066").s().p("AhDCZIAAkyICGAAIAAA+Ig3AAIAAA6IAxAAIAAA6IgxAAIAACAg");
	this.shape_6.setTransform(272.35,59.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000066").s().p("AhDCTQgNgKgEgMQgDgNAAgbIAAh1QAAgdADgMQAEgMANgKQAOgJASAAQAOAAAMAFQALAFAKALIAAhIIBMAAIAAEyIhMAAIAAgSQgLALgMAGQgMAGgNAAQgSAAgNgJgAgIg3QgDAEAAAPIAAB6QAAAQACAFQADAEAGAAQAHAAACgFQADgGAAgVIAAhzQAAgOgDgFQgCgEgHAAQgGAAgCAEg");
	this.shape_7.setTransform(246.975,59.775);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000066").s().p("AhEB3QgSgLABgmIAAgVQAAgcAJgKQAIgLAkgMQAkgPADgFQADgFAAgQQAAgUgDgGQgDgGgGAAQgHAAgCAFQgCAFAAAVIAAAbIhIAAIAAgRQAAgdAGgQQAHgQAUgMQAVgMAfAAQAnAAAUAOQATANAEAUQAFAUAAA+IAAB+IhLAAIAAgXQgHAOgKAGQgMAHgOAAQgVAAgQgLgAgLAdQgCAJAAARQAAATACAGQADAGAHAAQAGAAADgFQACgEAAgTIAAg0QgRAOgEAJg");
	this.shape_8.setTransform(227.05,62.325);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000066").s().p("AA+CAIAAijQAAgggCgIQgCgIgIAAQgIAAgCAIQgDAIAAAgIAACjIhJAAIAAifQAAglgCgHQgCgIgIAAQgFAAgEAFQgDADAAAGIgBAXIAACuIhLAAIAAj6IBNAAIgCAXQAJgOAMgHQAMgHAQAAQAeAAARAcQAKgOANgHQAMgHAPAAQATAAAMAJQAOAKADAOQAEAOAAAfIAACxg");
	this.shape_9.setTransform(202.5,62.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000066").s().p("AAMCZIAAivQAAgXgCgGQgCgGgIAAQgGAAgDAGQgCAHAAATIAACyIhNAAIAAkyIBNAAIAABGQAKgKAKgEQAMgFANABQAUgBAPALQANAKAEAOQADANAAAjIAACsg");
	this.shape_10.setTransform(177.35,59.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000066").s().p("AATCZIgEg3IgcAAIgEA3IhTAAIApkyIByAAIAuEygAgOAsIAbAAQgGgzgGhNQgMBXgDApg");
	this.shape_11.setTransform(157.275,59.55);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000066").s().p("AgcBkIAAg+IA5AAIAAA+gAgcglIAAg+IA5AAIAAA+g");
	this.shape_12.setTransform(137,64.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000066").s().p("AhcCZIAAkyIBQAAQAlAAATAHQATAGAMARQAMASAAAoQAAAbgIALQgJAKgYAGQAbAGAKANQAKAPAAAeIAAAcQAAAggHAOQgHAPgQAGQgPAGgwgBgAgMBlQAQgBAFgEQAEgFAAgTIAAgcQAAgUgEgEQgEgEgRgBgAgMgfIAIgBQALAAADgFQADgHAAgbQAAgOgDgGQgCgFgEgCQgEgCgMAAg");
	this.shape_13.setTransform(122.175,59.55);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000066").s().p("AhCCZIAAkyICGAAIAAA+Ig4AAIAAA6IAxAAIAAA6IgxAAIAACAg");
	this.shape_14.setTransform(104.2,59.55);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000066").s().p("AhAB+IAAg1IA5iTIg0AAIAAgzIB8AAIAAA4Ig4CQIA4AAIAAAzg");
	this.shape_15.setTransform(75.375,62.325);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000066").s().p("Ag+B6QgMgGgFgKQgGgKgBgLQgBgLAAghIAAioIBMAAIAACqQAAAdACAGQACAFAHABQAIgBACgFQACgGAAgfIAAioIBMAAIAAD6IhOAAIACgUQgIANgLAFQgMAHgPAAQgRAAgLgGg");
	this.shape_16.setTransform(58.375,62.55);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000066").s().p("Ag8CAIAAj6IBLAAIgCAgQAQgjAggCIAABYQgVABgKAFQgJAGgDAKQgCAKgBAkIAABjg");
	this.shape_17.setTransform(41.85,62.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000066").s().p("AgoB7QgSgHgKgMQgLgMgEgPQgEgPAAgcIAAhIQAAghAJgTQAJgTAUgKQAVgKAaAAQAfAAAVAMQAVAMAIAUQAJAUAAAlIAAAgIhiAAIAAA3QAAARACAFQADAFAGAAQAIAAADgHQADgGAAgTIAAghIBJAAIAAASQAAAYgDAMQgDANgLAOQgLAOgQAHQgRAHgZAAQgXAAgTgHgAgIhQQgCAFAAAVIAAASIAVAAIAAgSQAAgTgCgGQgCgGgHAAQgHAAgBAFg");
	this.shape_18.setTransform(24.525,62.325);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000066").s().p("AgnCZIAAj6IBOAAIAAD6gAgnhwIAAgpIBOAAIAAApg");
	this.shape_19.setTransform(9.3,59.55);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000066").s().p("AhEB3QgSgLABgmIAAgVQgBgcAKgKQAIgLAkgMQAkgPADgFQADgFAAgQQAAgUgDgGQgDgGgGAAQgIAAgCAFQgBAFAAAVIAAAbIhIAAIAAgRQgBgdAIgQQAGgQAVgMQAUgMAfAAQAnAAAUAOQATANAFAUQADAUABA+IAAB+IhLAAIAAgXQgHAOgKAGQgMAHgOAAQgVAAgQgLgAgLAdQgCAJAAARQgBATADAGQADAGAHAAQAHAAACgFQACgEAAgTIAAg0QgRAOgEAJg");
	this.shape_20.setTransform(-5.95,62.325);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000066").s().p("AgnCZIAAjMIgPAAIAAgoIAPAAQAAgZACgIQACgIAGgHQAHgGAMgEQALgDAagBIAcAAIAAAnQgYABgEACQgEACAAAKIAAAIIAgAAIAAAoIgSAAIAADMg");
	this.shape_21.setTransform(-21.175,59.55);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000066").s().p("AhFB3QgQgLgBgmIAAgVQAAgcAJgKQAKgLAjgMQAkgPADgFQADgFAAgQQAAgUgDgGQgDgGgGAAQgIAAgCAFQgCAFAAAVIAAAbIhIAAIAAgRQAAgdAIgQQAGgQAVgMQAUgMAfAAQAnAAATAOQAVANAEAUQADAUAAA+IAAB+IhKAAIAAgXQgHAOgKAGQgMAHgPAAQgTAAgSgLgAgLAdQgDAJAAARQABATACAGQACAGAJAAQAFAAADgFQACgEAAgTIAAg0QgRAOgEAJg");
	this.shape_22.setTransform(-36.7,62.325);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000066").s().p("AhjB4QgsgrAAhIQAAhGApgxQAogxBHAAQArAAAcARQAbARASAdQATAeAAAsQAAA5ghAhQggAighAAQgYAAgGgWQgMAMgJAFQgJAFgNAAQgdAAgRgWQgRgWAAglQAAguAYglQAYglAiAAQANAAALAHQALAHAIANIADgVIAlAAIgYCVIAAAHQAAAHAHAAQALAAANgLQAOgLAKgVQAKgWAAgbQAAgxgdgdQgegegvAAQg2AAgjAmQgkAlAAA+QAAA9AjAkQAjAkA1AAQAaAAAYgJQAYgJAVgSIAoAAQgZAggkAQQglAQglAAQhAAAgrgsgAgmgpQgMAhAAAkQAAASAHAMQAIANANAAQAMAAAJgKQAJgKAIgeQAIgdAAgbQAAgRgIgLQgHgKgLAAQgXAAgNAgg");
	this.shape_23.setTransform(-61.375,59.925);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000066").s().p("AgcBkIAAg+IA5AAIAAA+gAgcglIAAg+IA5AAIAAA+g");
	this.shape_24.setTransform(-86.9,64.9);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000066").s().p("AAWCZQgNgtgKhCQgDAdgGAhIgHAxIhOAAIAdiqIgdiIIBOAAIAHArIAJApIAQhUIBDAAIgcCIIAqCqg");
	this.shape_25.setTransform(-100.25,59.55);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000066").s().p("AhAB+IAAg1IA5iTIg0AAIAAgzIB8AAIAAA4Ig4CQIA4AAIAAAzg");
	this.shape_26.setTransform(-137.175,62.325);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000066").s().p("Ag+B6QgMgGgFgKQgGgKgBgLQgBgLAAghIAAioIBMAAIAACqQAAAdACAGQACAFAHABQAIgBACgFQACgGAAgfIAAioIBMAAIAAD6IhOAAIACgUQgIANgLAFQgMAHgPAAQgRAAgLgGg");
	this.shape_27.setTransform(-154.175,62.55);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000066").s().p("Ag8CAIAAj6IBMAAIgEAgQARgjAggCIAABYQgVABgKAFQgJAGgDAKQgCAKAAAkIAABjg");
	this.shape_28.setTransform(-170.7,62.1);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000066").s().p("AgoB7QgSgHgKgMQgLgMgEgPQgEgPAAgcIAAhIQAAghAJgTQAJgTAUgKQAVgKAaAAQAfAAAVAMQAVAMAIAUQAJAUAAAlIAAAgIhiAAIAAA3QAAARACAFQADAFAGAAQAIAAADgHQADgGAAgTIAAghIBJAAIAAASQAAAYgDAMQgDANgLAOQgLAOgQAHQgRAHgZAAQgXAAgTgHgAgIhQQgCAFAAAVIAAASIAVAAIAAgSQAAgTgCgGQgCgGgHAAQgHAAgBAFg");
	this.shape_29.setTransform(-188.025,62.325);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000066").s().p("AgmCZIAAj6IBOAAIAAD6gAgmhwIAAgpIBOAAIAAApg");
	this.shape_30.setTransform(-203.25,59.55);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000066").s().p("AhFB3QgQgLgBgmIAAgVQAAgcAJgKQAKgLAjgMQAkgPADgFQADgFAAgQQAAgUgDgGQgDgGgGAAQgIAAgCAFQgCAFAAAVIAAAbIhIAAIAAgRQAAgdAIgQQAGgQAVgMQAUgMAfAAQAnAAATAOQAVANAEAUQADAUAAA+IAAB+IhKAAIAAgXQgHAOgKAGQgMAHgPAAQgTAAgSgLgAgLAdQgDAJAAARQABATACAGQACAGAJAAQAFAAADgFQACgEAAgTIAAg0QgRAOgEAJg");
	this.shape_31.setTransform(-218.5,62.325);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000066").s().p("AgnCZIAAjMIgPAAIAAgoIAPAAQAAgZACgIQACgIAGgHQAHgGAMgEQALgDAagBIAcAAIAAAnQgYABgEACQgEACAAAKIAAAIIAgAAIAAAoIgSAAIAADMg");
	this.shape_32.setTransform(-233.725,59.55);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000066").s().p("AAMCZIAAivQAAgXgCgGQgCgGgIAAQgGAAgDAGQgCAHAAATIAACyIhNAAIAAkyIBNAAIAABGQAKgKAKgEQAMgFANABQAUgBAPALQAOAKADAOQACANAAAjIAACsg");
	this.shape_33.setTransform(-249.5,59.55);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000066").s().p("AgsB5QgVgJgIgPQgIgQAAgfIAAgNIBEAAIAAAQQAAAVADAGQACAGAIAAQAHAAADgEQADgEAAgNQAAgSgEgFQgEgFgngWQgjgSgHgPQgHgQAAgVQAAgeAIgOQAIgPATgIQATgHAZAAQAYAAASAGQARAGAKALQAJAKACAJQACAJAAATIAAAPIhEAAIAAgOQAAgSgBgEQgDgFgHAAQgGAAgDAFQgEAEAAAIQAAAMACAFQACAGAHAGQAHAHAZAMQAiAQAKAOQALAOAAAbQAAAfgIAQQgIAPgTAJQgSAIgbAAQgcAAgUgJg");
	this.shape_34.setTransform(-268.8,62.325);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000066").s().p("Ag+B6QgMgGgFgKQgGgKgBgLQgBgLAAghIAAioIBMAAIAACqQAAAdACAGQACAFAHABQAIgBACgFQACgGAAgfIAAioIBMAAIAAD6IhOAAIACgUQgIANgLAFQgMAHgPAAQgRAAgLgGg");
	this.shape_35.setTransform(-288.175,62.55);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000066").s().p("AhECQIAAgpQARAAAFgBQAGgDAAgGIgFgaIgqjRIBGAAIAYCpIAMipIBFAAIgWC0QgFArgDARQgEAPgIAKQgIALgPAEQgOAFgfABg");
	this.shape_36.setTransform(-307.075,64.1);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000066").s().p("AhEB3QgSgLABgmIAAgVQAAgcAJgKQAIgLAkgMQAkgPADgFQADgFAAgQQAAgUgDgGQgDgGgGAAQgHAAgCAFQgCAFAAAVIAAAbIhIAAIAAgRQAAgdAGgQQAHgQAUgMQAVgMAfAAQAnAAAUAOQATANAEAUQAFAUAAA+IAAB+IhLAAIAAgXQgHAOgKAGQgMAHgOAAQgVAAgQgLgAgLAdQgCAJAAARQAAATACAGQADAGAHAAQAHAAACgFQACgEAAgTIAAg0QgRAOgEAJg");
	this.shape_37.setTransform(-325.55,62.325);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000066").s().p("AgcBkIAAg+IA5AAIAAA+gAgcglIAAg+IA5AAIAAA+g");
	this.shape_38.setTransform(-345.65,64.9);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000066").s().p("AgzCXQgSgLgJgOQgJgPgCgPQgDgQAAgfIAAhbQAAgsAFgUQAFgUAWgQQAXgRAjAAQAjAAAXAPQAXAOAHAUQAHATAAAmIAAAOIhQAAIAAgcQAAgbgCgGQgDgHgIAAQgGAAgDAGQgDAGAAAXIAACSQAAAVADAGQADAHAGAAQAJAAADgIQADgHAAgVIAAglIgPAAIAAgtIBdAAIAACjIgyAAIgIgVQgIANgMAIQgNAHgQAAQgUAAgRgJg");
	this.shape_39.setTransform(-360.625,59.55);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000066").s().p("AgnCZIAAkyIBPAAIAAEyg");
	this.shape_40.setTransform(-376.875,59.55);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000066").s().p("ABVCwIAAjgQAAgtgDgKQgDgLgLAAQgLAAgDALQgDAKAAAtIAADgIhlAAIAAjbQAAgygCgLQgDgJgLgBQgHAAgFAGQgFAFgBAIIAAAgIAADvIhmAAIAAlZIBoAAIgCAiQAMgUARgJQARgKAVAAQApAAAZAnQANgUARgJQAQgKAUAAQAbAAASAMQARANAFAUQAFASAAAqIAAD1g");
	this.shape_41.setTransform(319.575,3.65);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000066").s().p("Ag5CrQgYgIgNgPQgOgQgFgVQgGgWAAgtIAAhWQAAgxAKgbQALgbAbgQQAbgQAqAAQAigBAaALQAZALAOARQANARAGARQAEASAAAlIAABTQAAAugEAXQgFAVgPATQgQATgXAJQgZAIgfAAQgiAAgYgHgAgLhuQgDAIAAAaIAACaQAAAZADAIQADAGAIAAQAJABAEgHQACgHAAgWIAAieQAAgagCgIQgDgGgKgBQgIABgDAGg");
	this.shape_42.setTransform(285.375,3.95);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000066").s().p("AhFCkQgagQgLgbQgLgcABgyIAAhhQgBgsAJgWQAKgWAcgSQAdgRApAAQApAAAdARQAcARAKAbQAJAbAAAwIhjAAIAAgoQAAgVgCgHQgEgIgJAAQgIAAgDAHQgDAGAAAXIAACiQgBASAFAJQAFAJAIAAQALABADgKQAEgKAAgbIAAgoIBdAAQABApgDAVQgDAUgOAWQgPAVgYAMQgYAKgjAAQgrABgagPg");
	this.shape_43.setTransform(258.8,3.95);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000066").s().p("AgmArIAAhVIBOAAIAABVg");
	this.shape_44.setTransform(240.55,16.925);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000066").s().p("Ag1DSIAAmjIBrAAIAAGjg");
	this.shape_45.setTransform(228.375,0.175);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000066").s().p("Ag1DSIAAlYIBrAAIAAFYgAg1ibIAAg2IBrAAIAAA2g");
	this.shape_46.setTransform(213.775,0.175);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000066").s().p("AheCkQgXgQAAg0IAAgcQAAgoAMgNQAMgPAxgRQAygVAEgHQAEgHAAgVQAAgbgEgIQgFgJgIAAQgLABgCAGQgDAHAAAdIAAAkIhiAAIAAgXQAAgoAJgVQAJgXAcgQQAcgQArAAQA2gBAbAUQAbASAFAcQAFAbAABVIAACtIhmAAIAAgfQgJATgOAIQgQAKgVgBQgbABgXgPgAgPAoQgEAMAAAYQAAAaAEAIQADAIALgBQAJAAADgFQADgHAAgaIAAhHQgZATgEANg");
	this.shape_47.setTransform(192.875,3.95);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000066").s().p("ABVCwIAAjgQAAgtgDgKQgDgLgLAAQgLAAgDALQgDAKAAAtIAADgIhlAAIAAjbQAAgygCgLQgDgJgLgBQgHAAgFAGQgFAFgBAIIAAAgIAADvIhmAAIAAlZIBoAAIgCAiQAMgUARgJQARgKAVAAQApAAAZAnQANgUARgJQAQgKAUAAQAbAAASAMQARANAFAUQAFASAAAqIAAD1g");
	this.shape_48.setTransform(159.225,3.65);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000066").s().p("AhYC8QgfgRgBgyIBmAAQAAAXARAAQALAAAEgHQAEgHAAgWIAAgaQgOAMgOAGQgPAHgQAAQgdAAgSgMQgSgLgHgTQgHgTAAgiIAAh8QAAgxASgWQASgVAkAAQAUAAAQAIQAPAIANAQIAHgaIBiAAIAAEJQAAA1gCAQQgDAQgPARQgPASgbAJQgbAJgoAAQgyAAgegRgAgLiIQgEAIAAAVIAABzQAAAXADAHQADAHAJAAQAKAAADgIQADgIAAgdIAAhrQAAgXgDgHQgDgGgJAAQgIAAgEAHg");
	this.shape_49.setTransform(124.675,6.625);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000066").s().p("AiJClQg7g9AAhhQAAhgA4hDQA3hEBiAAQA7AAAmAYQAlAWAZApQAZApAAA7QAABPgtAuQgsAugsAAQgiAAgIgeQgRARgLAGQgNAHgTAAQgnAAgXgeQgXgeAAgyQAAhBAggyQAhgzAvAAQASABAPAIQAOAKAMATIAEgeIAzAAIghDNIgBAJQAAAKAKAAQAPAAATgOQASgPAOgeQANgdAAgnQAAhCgngpQgogphBAAQhKAAgxA0QgxA0ABBWQgBBTAwAxQAvAxBKAAQAkAAAggMQAigMAcgZIA3AAQgiArgyAXQgxAVg0AAQhYAAg8g7gAg0g4QgRAsAAAyQAAAZALAQQAKARARAAQARAAANgNQAMgNALgpQALgogBgmQABgYgLgNQgJgPgQAAQggAAgRAtg");
	this.shape_50.setTransform(90.45,0.7);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000066").s().p("AhYCtIAAhIIBOjLIhGAAIAAhGICqAAIAABNIhODHIBOAAIAABFg");
	this.shape_51.setTransform(60.4,3.95);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000066").s().p("AhWCnQgPgIgIgNQgHgPgCgOQgCgQAAgsIAAjoIBpAAIAADqQAAApADAHQACAIAKgBQAMABACgIQACgIAAgrIAAjnIBpAAIAAFZIhqAAIABgdQgLARgPAJQgQAIgVAAQgXABgQgJg");
	this.shape_52.setTransform(37.15,4.25);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000066").s().p("AhTCwIAAlZIBoAAIgEAuQAXgxAsgCIAAB5QgdAAgOAIQgNAHgDAOQgEAOAAAxIAACJg");
	this.shape_53.setTransform(14.525,3.65);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000066").s().p("Ag3CpQgZgKgOgQQgPgRgFgUQgGgVABglIAAhlQAAgtAMgZQAMgaAcgPQAbgNAlAAQArAAAdAQQAdARALAcQAMAbAAAyIAAAtIiIAAIAABLQAAAXAEAHQAEAHAIgBQAMABAEgJQAEgKAAgZIAAgtIBkAAIAAAZQgBAggEARQgDASgQATQgOATgXAKQgWAJgjAAQggAAgagJgAgMhuQgDAHAAAdIAAAZIAeAAIAAgZQAAgbgCgIQgEgHgJgBQgJABgDAGg");
	this.shape_54.setTransform(-9.3,3.95);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000066").s().p("Ag1DSIAAlYIBrAAIAAFYgAg1ibIAAg2IBrAAIAAA2g");
	this.shape_55.setTransform(-30.225,0.175);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000066").s().p("AheCkQgXgQAAg0IAAgcQAAgoAMgNQAMgPAxgRQAygVAEgHQAEgHAAgVQAAgbgEgIQgFgJgIAAQgLABgCAGQgDAHAAAdIAAAkIhiAAIAAgXQAAgoAJgVQAJgXAcgQQAcgQArAAQA2gBAbAUQAbASAFAcQAFAbAABVIAACtIhmAAIAAgfQgJATgOAIQgQAKgVgBQgbABgXgPgAgPAoQgEAMAAAYQAAAaAEAIQADAIALgBQAJAAADgFQADgHAAgaIAAhHQgZATgEANg");
	this.shape_56.setTransform(-51.075,3.95);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000066").s().p("Ag1DSIAAkZIgWAAIAAg2IAWAAQAAgiACgMQADgLAJgJQAJgJARgFQAPgEAjAAIAnAAIAAA1QghAAgFADQgGADAAAOIAAALIAsAAIAAA2IgZAAIAAEZg");
	this.shape_57.setTransform(-71.975,0.175);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000066").s().p("AhYCtIAAhIIBOjLIhGAAIAAhGICqAAIAABNIhODHIBOAAIAABFg");
	this.shape_58.setTransform(-89.9,3.95);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000066").s().p("AhYCtIAAhIIBPjLIhHAAIAAhGICqAAIAABNIhODHIBOAAIAABFg");
	this.shape_59.setTransform(-109.5,3.95);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000066").s().p("AhWCnQgPgIgIgNQgHgPgCgOQgCgQAAgsIAAjoIBpAAIAADqQAAApACAHQADAIAKgBQALABADgIQACgIAAgrIAAjnIBpAAIAAFZIhrAAIACgdQgLARgPAJQgQAIgVAAQgXABgQgJg");
	this.shape_60.setTransform(-132.75,4.25);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000066").s().p("AheDFIAAg4QAYAAAHgCQAHgCAAgJIgGgkIg6kgIBfAAIAiDoIARjoIBfAAIgeD5QgHA7gFAWQgFAVgLAOQgLAOgUAHQgUAHgrAAg");
	this.shape_61.setTransform(-158.675,6.375);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000066").s().p("AheCkQgXgQAAg0IAAgcQAAgoAMgNQAMgPAxgRQAygVAEgHQAEgHAAgVQAAgbgEgIQgFgJgIAAQgLABgCAGQgDAHAAAdIAAAkIhiAAIAAgXQAAgoAJgVQAJgXAcgQQAcgQArAAQA2gBAbAUQAbASAFAcQAFAbAABVIAACtIhmAAIAAgfQgJATgOAIQgQAKgVgBQgbABgXgPgAgPAoQgEAMAAAYQAAAaAEAIQADAIALgBQAJAAADgFQADgHAAgaIAAhHQgZATgEANg");
	this.shape_62.setTransform(-184.025,3.95);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000066").s().p("AgnCJIAAhVIBPAAIAABVgAgngzIAAhVIBPAAIAABVg");
	this.shape_63.setTransform(-211.625,7.5);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000066").s().p("AhXDSIAAmjIBsAAIAAFPIBDAAIAABUg");
	this.shape_64.setTransform(-226.725,0.175);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000066").s().p("Ag2DSIAAmjIBsAAIAAGjg");
	this.shape_65.setTransform(-245.35,0.175);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000066").s().p("AAaDSIgFhLIgnAAIgGBLIhxAAIA3mjICeAAIA+GjgAgTA8IAlAAQgJhGgIhqQgQB4gEA4g");
	this.shape_66.setTransform(-266.525,0.175);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000066").s().p("ABJDSIAAkbIgmEbIhDAAIgokUIAAEUIhgAAIAAmjICOAAIANBZIAOBrIAZjEICPAAIAAGjg");
	this.shape_67.setTransform(-299.075,0.175);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000066").s().p("AheDSIAAmjIC1AAIAABUIhJAAIAABQIBFAAIAABPIhFAAIAABcIBRAAIAABUg");
	this.shape_68.setTransform(-328.575,0.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-384,-34.1,763,118.80000000000001);


(lib.Tween28 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.COMDES();
	this.instance.setTransform(-960,-540);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-960,-540,1920,1080);


(lib.Tween27 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EgDTBUtMAAAipZIGnAAMAAACpZg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.2,-542.1,42.4,1084.2);


(lib.Tween26 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#336633").s().p("AhzFLQg0gcgPgpQgPgrAAhMIAAgtIClAAIAABTQABAnAGAKQAIAMARAAQARAAAJgPQAJgOAAgbQAAg8gRgTQgRgThCgrQhCgtgWgTQgWgTgOgkQgOgjAAg3QAAhPAUgkQAUglAtgVQAtgUBAAAQBEAAAyAXQAxAWAPAjQAQAhAABSIAAAcIilAAIAAg0QAAgjgHgKQgGgKgPAAQgQAAgHANQgJANAAAcQAAAhAKASQAJARAoAZQB3BHAfAsQAfAuAABlQAABJgRAjQgRAjgyAYQgxAXhBAAQhHAAgygbg");
	this.shape.setTransform(281.65,0.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#336633").s().p("AiPFXIAAqtICyAAIAAIkIBtAAIAACJg");
	this.shape_1.setTransform(244.575,0.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#336633").s().p("AiPFXIAAqtICyAAIAAIkIBtAAIAACJg");
	this.shape_2.setTransform(211.475,0.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#336633").s().p("AhZFXIAAqtICyAAIAAKtg");
	this.shape_3.setTransform(181.05,0.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#336633").s().p("AAhFXIhHkmIAAEmIizAAIAAqtICzAAIAAEKIBOkKICpAAIhoE1IBxF4g");
	this.shape_4.setTransform(147.25,0.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#336633").s().p("Ah0FLQgzgcgPgpQgQgrABhMIAAgtIClAAIAABTQABAnAGAKQAIAMARAAQARAAAJgPQAJgOAAgbQAAg8gRgTQgRgThCgrQhDgtgVgTQgWgTgOgkQgOgjAAg3QAAhPAUgkQAUglAtgVQAtgUBAAAQBFAAAwAXQAyAWAPAjQAQAhAABSIAAAcIilAAIAAg0QAAgjgHgKQgGgKgOAAQgRAAgHANQgJANAAAcQAAAhAJASQAKARAoAZQB3BHAfAsQAfAuAABlQAABJgRAjQgRAjgyAYQgxAXhBAAQhHAAgzgbg");
	this.shape_5.setTransform(99.5,0.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#336633").s().p("AiaFXIAAqtIEpAAIAACJIh3AAIAACCIBvAAIAACCIhvAAIAACXICDAAIAACJg");
	this.shape_6.setTransform(44.6,0.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#336633").s().p("AAiFXIAAjkQAAg3gJgNQgJgNgjAAIAAE1IizAAIAAqtIB+AAQB+AAAtAJQAsAKAdAoQAbAoAABYQAABQgTAcQgVAbg6AGQA1ANASAVQASAWAGATQADASAABUIAAC0gAgThIQAdgBAMgHQAMgJAAgtIAAgmQAAgggMgLQgMgKgdAAg");
	this.shape_7.setTransform(2.2,0.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#336633").s().p("AArFXIgKh7Ig/AAIgKB7Ii5AAIBbqtIEBAAIBnKtgAggBiIA9AAQgOh0gNirQgbDEgHBbg");
	this.shape_8.setTransform(-43.325,0.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#336633").s().p("AAzFXQgeiegWjJQgLBWgnERIjeAAIhQqtICtAAIATDvIATDnQAJizAokjIC4AAQAEAeAQDEIAUEFQAPj5AjjuICtAAIhPKtg");
	this.shape_9.setTransform(-99.975,0.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#336633").s().p("AhYFXIAAokIhqAAIAAiJIGFAAIAACJIhqAAIAAIkg");
	this.shape_10.setTransform(-157.375,0.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#336633").s().p("AiXFXIAAqtIEuAAIAACJIh8AAIAACCIBvAAIAACCIhvAAIAAEgg");
	this.shape_11.setTransform(-193.25,0.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#336633").s().p("AhiFUQgsgSgbgkQgbglgFgpQgFgrAAhrIAAh0QAAhoAFgrQAFgrAagjQAZgkAsgTQAsgTA5AAQA3AAAsASQAsASAbAkQAaAkAGArQAFAqAABqIAAB0QAABogFAsQgFAqgaAkQgZAkgsATQgsATg6AAQg2AAgsgSgAgTjmQgIALAAA1IAAFAQAAA8AFANQAFAPARAAQASAAAFgQQAFgQAAg+IAAk6QAAgwgFgNQgGgOgQAAQgNAAgHALg");
	this.shape_12.setTransform(-235.725,0.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#336633").s().p("Ah0FLQgygcgQgpQgQgrAAhMIAAgtICnAAIAABTQAAAnAGAKQAHAMASAAQARAAAJgPQAIgOAAgbQAAg8gQgTQgRgThCgrQhCgtgWgTQgWgTgOgkQgOgjAAg3QAAhPAUgkQAUglAtgVQAtgUBAAAQBFAAAwAXQAxAWARAjQAPAhAABSIAAAcIilAAIAAg0QgBgjgGgKQgHgKgNAAQgQAAgJANQgIANAAAcQAAAhAJASQAJARApAZQB3BHAfAsQAfAuAABlQAABJgRAjQgSAjgwAYQgyAXhBAAQhHAAgzgbg");
	this.shape_13.setTransform(-281.9,0.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-307.2,-55.8,614.4,111.69999999999999);


(lib.Tween25 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.PHOTOSHOPLOGO();
	this.instance.setTransform(-53.15,-51.8,0.0886,0.0886);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-53.1,-51.8,106.30000000000001,103.69999999999999);


(lib.Tween24 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.PREMIEREPROLOGO();
	this.instance.setTransform(-52.65,-51.35,0.0351,0.0351);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-52.6,-51.3,105.30000000000001,102.69999999999999);


(lib.Tween23 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.ILLUSTRATORLOGO();
	this.instance.setTransform(-80.25,-50.15,0.0418,0.0418);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-80.2,-50.1,160.5,100.30000000000001);


(lib.Tween22 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.ANIMATELOGO();
	this.instance.setTransform(-81.95,-61.5,0.1893,0.1893);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-81.9,-61.5,163.9,123.1);


(lib.Tween21 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.AFTEREFFECTSLOGO();
	this.instance.setTransform(-52.3,-51.05,0.0587,0.0587);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-52.3,-51,104.69999999999999,102.1);


(lib.Tween20 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.LIGHTROOMLOGO();
	this.instance.setTransform(-50.75,-49.6,0.0483,0.0483);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50.7,-49.6,101.5,99.2);


(lib.Tween19 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.BLENDERLOGO();
	this.instance.setTransform(-55.1,-45.05,0.0441,0.0441);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-55.1,-45,110.30000000000001,90.1);


(lib.Tween18 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.TOONBOOMLOGO();
	this.instance.setTransform(-86.5,-39,0.1082,0.1082);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86.5,-39,173,78);


(lib.Tween17 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._3DSMAXLOGO();
	this.instance.setTransform(-75.8,-75.8,0.1516,0.1516);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.8,-75.8,151.6,151.6);


(lib.Tween16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#006633").s().p("Ag8D1IAAixIhZk4IB1AAQAbCPAEAyQAJhOAZhzIB1AAIhdE4IAACxg");
	this.shape.setTransform(249.175,413.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#006633").s().p("AAfD1IhCjfIAADfIhqAAIAAnpIBqAAIBHDcIAAjcIBqAAIAAHpg");
	this.shape_1.setTransform(217.725,413.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#006633").s().p("AhGDyQgfgNgTgZQgTgagEgeQgDgeAAhMIAAhTQAAhKADgeQAEggASgYQASgaAfgOQAggNAoAAQAnAAAgAMQAfANATAaQATAaAEAeQADAeAABMIAABTQAABKgDAeQgEAfgSAaQgSAZgfAOQggANgpAAQgmAAgggNgAgOijQgFAHAAAmIAADjQAAArAEAKQADALAMgBQANAAADgLQAEgLAAgsIAAjgQAAgigEgKQgEgJgLAAQgJgBgGAJg");
	this.shape_2.setTransform(183.975,413.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#006633").s().p("ABVD1IAAlKIgsFKIhOAAIgvlDIAAFDIhwAAIAAnpIClAAIAPBoIARB8IAejkICmAAIAAHpg");
	this.shape_3.setTransform(144.85,413.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#006633").s().p("AAYD1IAAijQAAgngGgJQgHgKgZAAIAADdIh/AAIAAnpIBaAAQBZAAAgAHQAgAHAUAdQAUAcAAA/QAAA5gOATQgOAVgqADQAmAJANAQQANAPADAOQADANAAA7IAACBgAgOg0QAVABAIgGQAJgGAAghIAAgbQAAgWgIgIQgJgHgVgBg");
	this.shape_4.setTransform(106.025,413.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#006633").s().p("AAfD1IgHhYIgtAAIgHBYIiEAAIBBnpIC3AAIBJHpgAgWBGIArAAQgKhSgKh7QgSCMgFBBg");
	this.shape_5.setTransform(73.525,413.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#006633").s().p("AATD1IAAjOIglAAIAADOIh/AAIAAnpIB/AAIAACvIAlAAIAAivIB/AAIAAHpg");
	this.shape_6.setTransform(40.55,413.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#006633").s().p("ABVD1IAAlKIgsFKIhOAAIgvlDIAAFDIhvAAIAAnpICkAAIAQBoIARB8IAdjkIClAAIAAHpg");
	this.shape_7.setTransform(-9.8,413.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#006633").s().p("AhGDyQgfgNgTgZQgTgagEgeQgDgeAAhMIAAhTQAAhKADgeQAEggASgYQASgaAfgOQAggNAoAAQAnAAAgAMQAfANATAaQATAaAEAeQADAeAABMIAABTQAABKgDAeQgEAfgSAaQgSAZgfAOQggANgpAAQgmAAgggNgAgOijQgFAHAAAmIAADjQAAArAEAKQADALAMgBQANAAADgLQAEgLAAgsIAAjgQAAgigEgKQgEgJgLAAQgJgBgGAJg");
	this.shape_8.setTransform(-48.975,413.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#006633").s().p("AhGDyQgfgNgTgZQgTgagEgeQgDgeAAhMIAAhTQAAhKADgeQAEggASgYQASgaAfgOQAggNAoAAQAnAAAgAMQAfANATAaQATAaAEAeQADAeAABMIAABTQAABKgDAeQgEAfgSAaQgSAZgfAOQggANgpAAQgmAAgggNgAgOijQgFAHAAAmIAADjQAAArAEAKQADALAMgBQANAAADgLQAEgLAAgsIAAjgQAAgigEgKQgEgJgLAAQgJgBgGAJg");
	this.shape_9.setTransform(-82.875,413.15);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#006633").s().p("AiTD1IAAnpIB/AAQA7AAAfAKQAfAIATAdQATAdAAA/QAAAsgNARQgOAQgnAKQAsAKAQAWQAPAWAAAwIAAAuQAAAygLAYQgLAXgZAJQgZAJhMAAgAgUChQAagBAIgIQAHgHAAgdIAAguQAAgggHgGQgGgHgcgBgAgUg0IANAAQASABAFgKQAFgJAAgsQAAgXgEgIQgFgKgGgDQgGgCgUgBg");
	this.shape_10.setTransform(-116.675,413.15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#006633").s().p("AAfD1IhCjfIAADfIhqAAIAAnpIBqAAIBHDcIAAjcIBqAAIAAHpg");
	this.shape_11.setTransform(-150.825,413.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#006633").s().p("AhGDyQgfgNgTgZQgTgagEgeQgDgeAAhMIAAhTQAAhKADgeQAEggASgYQASgaAfgOQAggNAoAAQAnAAAgAMQAfANATAaQATAaAEAeQADAeAABMIAABTQAABKgDAeQgEAfgSAaQgSAZgfAOQggANgpAAQgmAAgggNgAgOijQgFAHAAAmIAADjQAAArAEAKQADALAMgBQANAAADgLQAEgLAAgsIAAjgQAAgigEgKQgEgJgLAAQgJgBgGAJg");
	this.shape_12.setTransform(-184.575,413.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#006633").s().p("AhGDyQgfgNgTgZQgTgagEgeQgDgeAAhMIAAhTQAAhKADgeQAEggASgYQASgaAfgOQAggNAoAAQAnAAAgAMQAfANATAaQATAaAEAeQADAeAABMIAABTQAABKgDAeQgEAfgSAaQgSAZgfAOQggANgpAAQgmAAgggNgAgOijQgFAHAAAmIAADjQAAArAEAKQADALAMgBQANAAADgLQAEgLAAgsIAAjgQAAgigEgKQgEgJgLAAQgJgBgGAJg");
	this.shape_13.setTransform(-218.475,413.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#006633").s().p("Ag/D1IAAmHIhLAAIAAhiIEVAAIAABiIhLAAIAAGHg");
	this.shape_14.setTransform(-249.725,413.15);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#006633").s().p("AAYD1IAAijQAAgngGgJQgHgKgZAAIAADdIh/AAIAAnpIBaAAQBZAAAgAHQAgAHAUAcQAUAdAAA+QAAA6gOATQgOAUgqAEQAmAKANAOQANAQADAOQADAMAAA8IAACBgAgOg0QAVAAAIgFQAJgGAAghIAAgbQAAgXgIgHQgJgHgVAAg");
	this.shape_15.setTransform(-70.075,318);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#006633").s().p("AhuD1IAAnpIDUAAIAABiIhVAAIAABdIBPAAIAABcIhPAAIAABsIBeAAIAABig");
	this.shape_16.setTransform(-99,318);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#006633").s().p("AiSD1IAAnpIBfAAQBbAAAhAJQAgAIARATQARAUAEAXQAEAYAABGIAACrQAABCgFAWQgHAWgQANQgOAMgYAFQgWAFguAAgAgTChQAbAAAGgLQAGgLAAgxIAAi9QAAgigCgJQgCgJgIgFQgHgEgUAAg");
	this.shape_17.setTransform(-129.55,318);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#006633").s().p("AAfD1IhCjfIAADfIhqAAIAAnpIBqAAIBHDcIAAjcIBqAAIAAHpg");
	this.shape_18.setTransform(-163.625,318);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#006633").s().p("AhtD1IAAnpIDTAAIAABiIhVAAIAABdIBQAAIAABcIhQAAIAABsIBdAAIAABig");
	this.shape_19.setTransform(-192.55,318);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#006633").s().p("AhlD1IAAnpIB+AAIAAGHIBNAAIAABig");
	this.shape_20.setTransform(-216.95,318);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#006633").s().p("AiTD1IAAnpIB/AAQA7AAAfAKQAfAIATAdQATAdAAA/QAAAsgNARQgOAQgnAKQAsAJAQAWQAPAYAAAvIAAAuQAAAxgLAYQgLAYgZAJQgZAJhMAAgAgUChQAagBAIgHQAHgIAAgdIAAguQAAgggHgHQgGgGgcgBgAgUg0IANAAQASABAFgJQAFgKAAgsQAAgXgEgIQgFgKgGgDQgGgCgUAAg");
	this.shape_21.setTransform(-246.625,318);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#006633").s().p("AAjD1QgVhKgRhpQgFAvgIA0IgMBQIh8AAIAukQIgujZIB7AAIANBDIANBDIAaiGIBrAAIgtDZIBEEQg");
	this.shape_22.setTransform(203.05,216.5);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#006633").s().p("AAfD1IgHhYIgtAAIgHBYIiEAAIBBnpIC3AAIBJHpgAgWBGIArAAQgKhSgKh7QgSCMgFBBg");
	this.shape_23.setTransform(170.425,216.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#006633").s().p("ABWD1IAAlKIgtFKIhOAAIgvlDIAAFDIhwAAIAAnpICmAAIAOBoIARB8IAejkIClAAIAAHpg");
	this.shape_24.setTransform(132.45,216.5);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#006633").s().p("AhSDsQglgUgKgdQgMgeAAg4IAAgfIB2AAIAAA7QAAAcAGAHQAEAJANgBQAMABAGgLQAHgKAAgTQgBgrgMgOQgLgNgvgfQgwgggPgNQgPgOgKgaQgLgZABgnQAAg4AOgaQAOgaAggPQAhgOAsAAQAxAAAkAPQAiARAMAYQALAYAAA7IAAATIh2AAIAAgkQgBgagEgGQgEgIgKABQgMAAgFAJQgHAKAAASQAAAZAIAMQAFAMAeATQBUAyAXAfQAVAhAABHQABA1gMAZQgNAYgjASQgjAQgvAAQgyAAgkgTg");
	this.shape_25.setTransform(83.3,216.5);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#006633").s().p("AiTD1IAAnpIBgAAQBbAAAhAJQAgAIARATQARAUAEAYQAFAXAABFIAACrQAABDgHAWQgGAWgPANQgPAMgYAFQgWAFguAAgAgTChQAbAAAGgLQAGgLAAgxIAAi9QAAgigCgJQgCgKgIgDQgHgGgUAAg");
	this.shape_26.setTransform(50.3,216.5);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#006633").s().p("AhZDsQghgUgKgcQgLgdAAhGIAAgmIB6AAIAABPQAAAgAEAJQAEAIANAAQANAAAFgLQAEgLAAguIAAghQAAgdgGgNQgHgNgLgEQgMgEgkAAIAAhHQArAAAKgDQAKgDAFgLQAEgMAAgYIAAgbQAAgagFgIQgFgIgMAAQgLAAgFAJQgFAIAAAdIAAAoIh6AAIAAgqQAAhGAggZQAggZBGAAQBXAAAfAjQAfAiAAA9QAAApgLASQgMATgcAPQAcAJAOAVQANAVAABOQAAA7gNAgQgNAgghARQghARgzAAQg5AAghgTg");
	this.shape_27.setTransform(16.375,216.475);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#006633").s().p("AAYD1IgzjSIAADSIh/AAIAAnpIB/AAIAAC/IA4i/IB4AAIhKDdIBQEMg");
	this.shape_28.setTransform(-25.95,216.5);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#006633").s().p("AhSDsQgkgUgLgdQgLgeAAg4IAAgfIB2AAIAAA7QgBAcAGAHQAEAJANgBQAMABAGgLQAHgKgBgTQABgrgMgOQgNgNgugfQgwgggPgNQgQgOgKgaQgKgZAAgnQAAg4APgaQAOgaAggPQAhgOAsAAQAxAAAkAPQAiARAMAYQALAYAAA7IAAATIh3AAIAAgkQAAgagEgGQgEgIgKABQgLAAgHAJQgFAKgBASQABAZAGAMQAHAMAcATQBVAyAWAfQAXAhgBBHQAAA1gMAZQgMAYgjASQgjAQgvAAQgyAAgkgTg");
	this.shape_29.setTransform(-60.05,216.5);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#006633").s().p("AhtD1IAAnpIDTAAIAABiIhVAAIAABdIBQAAIAABcIhQAAIAABsIBdAAIAABig");
	this.shape_30.setTransform(-88.25,216.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#006633").s().p("AiTD1IAAnpIBgAAQBbAAAhAJQAgAIARATQARAUAEAYQAFAXAABFIAACrQAABDgHAWQgGAWgPANQgQAMgWAFQgXAFguAAgAgTChQAaAAAHgLQAGgLAAgxIAAi9QAAgigCgJQgCgKgIgDQgHgGgUAAg");
	this.shape_31.setTransform(-118.8,216.5);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#006633").s().p("AhGDzQgfgOgTgZQgTgagEgeQgDgeAAhMIAAhTQAAhKADgeQAEggASgYQASgaAfgOQAggNAoAAQAnAAAgAMQAfANATAaQATAaAEAeQADAeAABMIAABTQAABKgDAeQgEAfgSAaQgSAZgfAOQggANgpAAQgmAAgggMgAgOijQgFAHAAAmIAADjQAAArAEAKQADALAMgBQANAAADgLQAEgLAAgsIAAjgQAAgigEgKQgEgJgLAAQgJgBgGAJg");
	this.shape_32.setTransform(-153.075,216.5);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#006633").s().p("Ag/D1IAAmHIhLAAIAAhiIEVAAIAABiIhLAAIAAGHg");
	this.shape_33.setTransform(-184.325,216.5);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#006633").s().p("AhIDsQghgPgRgXQgRgYgDgZQgDgaAAhTIAAkhICAAAIAAFuQAAAgADAJQAEAJAKAAQALAAAEgKQADgKAAgkIAAloICAAAIAAFGQAAA4gEAXQgDAWgSAYQgSAYgdAMQgeAMgnAAQgrAAgigOg");
	this.shape_34.setTransform(-215.575,217.025);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#006633").s().p("AAfD1IgHhYIgtAAIgHBYIiEAAIBBnpIC3AAIBJHpgAgWBGIArAAQgKhSgKh7QgSCMgFBBg");
	this.shape_35.setTransform(-248.225,216.5);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#006633").s().p("ABWD1IAAlKIgtFKIhOAAIgvlCIAAFCIhvAAIAAnpIClAAIAPBoIARB9IAdjlIClAAIAAHpg");
	this.shape_36.setTransform(168.65,109);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#006633").s().p("AhGDzQgfgNgTgaQgTgagEgeQgDgfAAhLIAAhTQAAhKADgfQAEgeASgaQASgZAfgOQAggOAoAAQAnABAgANQAfANATAZQATAaAEAeQADAfAABLIAABTQAABKgDAfQgEAegSAZQgSAagfANQggAOgpABQgmAAgggNgAgOikQgFAIAAAmIAADkQAAAqAEALQADAJAMABQANAAADgMQAEgMAAgrIAAjgQAAgjgEgJQgEgKgLAAQgJABgGAHg");
	this.shape_37.setTransform(129.475,109);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#006633").s().p("AhGDzQgfgNgTgaQgTgagEgeQgDgfAAhLIAAhTQAAhKADgfQAEgeASgaQASgZAfgOQAggOAoAAQAnABAgANQAfANATAZQATAaAEAeQADAfAABLIAABTQAABKgDAfQgEAegSAZQgSAagfANQggAOgpABQgmAAgggNgAgOikQgFAIAAAmIAADkQAAAqAEALQADAJAMABQANAAADgMQAEgMAAgrIAAjgQAAgjgEgJQgEgKgLAAQgJABgGAHg");
	this.shape_38.setTransform(95.575,109);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#006633").s().p("AAYD1IAAijQAAgngGgKQgHgJgZAAIAADdIh/AAIAAnpIBaAAQBZAAAgAHQAgAHAUAcQAUAdAAA+QAAA6gOAUQgOAUgqADQAmAKANAOQANAQADANQADANAAA7IAACCgAgOgzQAVgBAIgFQAJgGAAggIAAgbQAAgXgIgIQgJgIgVABg");
	this.shape_39.setTransform(62.025,109);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#006633").s().p("Ag/D1IAAmHIhLAAIAAhiIEVAAIAABiIhLAAIAAGHg");
	this.shape_40.setTransform(30.925,109);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#006633").s().p("AATD1IAAjOIglAAIAADOIiAAAIAAnpICAAAIAACvIAlAAIAAivICAAAIAAHpg");
	this.shape_41.setTransform(-0.55,109);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#006633").s().p("AhSDwQgdgQgPgXQgOgXgEgZQgDgaAAgyIAAiQQAAhHAIgfQAHghAkgaQAjgaA6gBQA2AAAlAYQAmAWAKAhQAMAfAAA8IAAAVIiAAAIAAgsQAAgqgDgLQgEgLgNAAQgLABgFAIQgEAJAAAmIAADrQAAAgAEALQAFALALAAQAOgBAFgMQAGgLAAgjIAAg5IgaAAIAAhKICVAAIAAEGIhQAAIgMgjQgNAWgUAMQgUALgaABQggAAgbgQg");
	this.shape_42.setTransform(-34.95,109);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#006633").s().p("Ag/D1IAAnpIB/AAIAAHpg");
	this.shape_43.setTransform(-60.875,109);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#006633").s().p("AhlD1IAAnpIB+AAIAAGHIBNAAIAABig");
	this.shape_44.setTransform(-80.6,109);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#006633").s().p("AhtD1IAAnpIDTAAIAABiIhVAAIAABdIBQAAIAABcIhQAAIAABsIBdAAIAABig");
	this.shape_45.setTransform(-116.5,109);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#006633").s().p("AiTD1IAAnpIB/AAQA7AAAfAJQAfAKATAcQATAdAABAQAAAqgNASQgOARgnAIQAsAKAQAWQAPAXAAAwIAAAuQAAAxgLAYQgLAZgZAIQgZAJhMAAgAgUChQAagBAIgHQAHgIAAgeIAAguQAAgfgHgHQgGgGgcgBgAgUgzIANAAQASgBAFgIQAFgKAAgrQAAgYgEgJQgFgJgGgCQgGgDgUAAg");
	this.shape_46.setTransform(-146.975,109);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#006633").s().p("AhGDzQgfgNgTgaQgTgagEgeQgDgfAAhLIAAhTQAAhKADgfQAEgeASgaQASgZAfgOQAggOAoAAQAnABAgANQAfANATAZQATAaAEAeQADAfAABLIAABTQAABKgDAfQgEAegSAZQgSAagfANQggAOgpABQgmAAgggNgAgOikQgFAIAAAmIAADkQAAAqAEALQADAJAMABQANAAADgMQAEgMAAgrIAAjgQAAgjgEgJQgEgKgLAAQgJABgGAHg");
	this.shape_47.setTransform(-181.325,109);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#006633").s().p("AiTD1IAAnpIBgAAQBbAAAhAIQAgAJARATQARATAEAYQAFAYAABGIAACrQAABBgHAXQgGAWgPAMQgPANgYAFQgWAFguAAgAgTChQAbAAAGgLQAGgLAAgxIAAi+QAAgggCgKQgCgJgIgFQgHgEgUAAg");
	this.shape_48.setTransform(-215.2,109);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#006633").s().p("AAfD1IgHhYIgtAAIgHBYIiEAAIBBnpIC3AAIBJHpgAgWBGIArAAQgKhSgKh7QgSCMgFBBg");
	this.shape_49.setTransform(-248.225,109);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#006633").s().p("AAYD1IAAijQAAgngGgJQgHgKgZAAIAADdIh/AAIAAnpIBaAAQBZAAAgAHQAgAHAUAcQAUAdAAA/QAAA5gOATQgOAVgqADQAmAJANAQQANAPADAOQADAMAAA8IAACBgAgOg0QAVAAAIgFQAJgGAAghIAAgbQAAgWgIgIQgJgHgVgBg");
	this.shape_50.setTransform(206.975,4);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#006633").s().p("AhGDzQgfgNgTgaQgTgagEgeQgDgeAAhMIAAhTQAAhKADgeQAEggASgZQASgZAfgOQAggNAoAAQAnAAAgAMQAfAOATAZQATAaAEAeQADAeAABMIAABTQAABKgDAeQgEAfgSAZQgSAagfAOQggANgpAAQgmAAgggMgAgOijQgFAHAAAmIAADjQAAArAEALQADAKAMgBQANAAADgLQAEgMAAgrIAAjgQAAgigEgKQgEgJgLAAQgJgBgGAJg");
	this.shape_51.setTransform(173.225,4);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#006633").s().p("Ag/D1IAAmHIhLAAIAAhiIEVAAIAABiIhLAAIAAGHg");
	this.shape_52.setTransform(141.975,4);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#006633").s().p("AAfD1IgHhYIgtAAIgHBYIiEAAIBBnpIC3AAIBJHpgAgWBGIArAAQgKhSgKh7QgSCMgFBBg");
	this.shape_53.setTransform(115.375,4);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#006633").s().p("AAYD1IAAijQAAgngGgJQgHgKgZAAIAADdIh/AAIAAnpIBaAAQBZAAAgAHQAgAHAUAcQAUAdAAA/QAAA5gOATQgOAVgqADQAmAJANAQQANAPADAOQADAMAAA8IAACBgAgOg0QAVAAAIgFQAJgGAAghIAAgbQAAgWgIgIQgJgHgVgBg");
	this.shape_54.setTransform(82.975,4);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#006633").s().p("Ag/D1IAAmHIhLAAIAAhiIEVAAIAABiIhLAAIAAGHg");
	this.shape_55.setTransform(51.875,4);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#006633").s().p("AhSDsQgkgUgLgdQgMgfABg3IAAgfIB2AAIAAA7QAAAcAFAHQAEAJANgBQAMABAHgKQAFgLAAgTQABgsgMgNQgNgNguggQgwgfgPgNQgPgOgLgaQgJgYgBgnQAAg5APgaQAOgaAggPQAggOAuAAQAxAAAiAPQAkARALAYQALAYAAA7IAAATIh3AAIAAgkQABgagFgGQgFgIgJABQgLAAgHAJQgFAKAAASQAAAZAGAMQAHANAcARQBWAzAVAfQAXAhAABHQAAA1gNAZQgMAYgjARQgjASgvgBQgyAAgkgTg");
	this.shape_56.setTransform(21.6,4);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#006633").s().p("AhIDsQghgPgRgXQgRgYgDgZQgDgaAAhTIAAkhICAAAIAAFuQAAAgADAJQAEAJAKAAQALAAAEgKQADgKAAgkIAAloICAAAIAAFGQAAA4gEAXQgDAWgSAYQgSAYgdAMQgeAMgnAAQgrAAgigOg");
	this.shape_57.setTransform(-11.425,4.525);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#006633").s().p("AhmD1IAAnpIB/AAIAAGHIBOAAIAABig");
	this.shape_58.setTransform(-39.15,4);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#006633").s().p("AhlD1IAAnpIB+AAIAAGHIBOAAIAABig");
	this.shape_59.setTransform(-62.75,4);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#006633").s().p("Ag/D1IAAnpIB/AAIAAHpg");
	this.shape_60.setTransform(-84.475,4);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#006633").s().p("AhtD1IAAnpIDTAAIAABiIhVAAIAABdIBQAAIAABcIhQAAIAABsIBdAAIAABig");
	this.shape_61.setTransform(-116.5,4);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#006633").s().p("AiTD1IAAnpIB/AAQA7AAAfAKQAfAIATAdQATAdAAA/QAAArgNASQgOAQgnAKQAsAKAQAVQAPAYAAAvIAAAuQAAAygLAYQgLAXgZAJQgZAJhMAAgAgUChQAagBAIgHQAHgIAAgdIAAguQAAgggHgHQgGgGgcgBgAgUg0IANAAQASABAFgKQAFgJAAgsQAAgWgEgJQgFgKgGgDQgGgCgUgBg");
	this.shape_62.setTransform(-146.975,4);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#006633").s().p("AhGDzQgfgNgTgaQgTgagEgeQgDgeAAhMIAAhTQAAhKADgeQAEggASgZQASgZAfgOQAggNAoAAQAnAAAgAMQAfAOATAZQATAaAEAeQADAeAABMIAABTQAABKgDAeQgEAfgSAZQgSAagfAOQggANgpAAQgmAAgggMgAgOijQgFAHAAAmIAADjQAAArAEALQADAKAMgBQANAAADgLQAEgMAAgrIAAjgQAAgigEgKQgEgJgLAAQgJgBgGAJg");
	this.shape_63.setTransform(-181.325,4);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#006633").s().p("AiTD1IAAnpIBgAAQBbAAAhAJQAgAIARATQARAUAEAYQAFAXAABGIAACqQAABDgHAWQgGAWgPANQgPAMgYAFQgWAFguAAgAgTChQAbAAAGgLQAGgLAAgxIAAi9QAAgigCgJQgCgKgIgDQgHgGgUAAg");
	this.shape_64.setTransform(-215.2,4);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#006633").s().p("AAfD1IgHhYIgtAAIgHBYIiEAAIBBnpIC3AAIBJHpgAgWBGIArAAQgKhSgKh7QgSCMgFBBg");
	this.shape_65.setTransform(-248.225,4);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#006633").s().p("AhGDzQgfgNgTgaQgTgagEgeQgDgeAAhMIAAhTQAAhKADgeQAEggASgZQASgZAfgOQAggNAoAAQAnAAAgAMQAfAOATAZQATAaAEAeQADAeAABMIAABTQAABKgDAeQgEAfgSAZQgSAagfAOQggANgpAAQgmAAgggMgAgOijQgFAHAAAmIAADjQAAArAEAKQADALAMgBQANAAADgLQAEgMAAgrIAAjgQAAgigEgKQgEgJgLAAQgJgBgGAJg");
	this.shape_66.setTransform(236.375,-99.95);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#006633").s().p("AAYD1IAAijQAAgngGgJQgHgKgZAAIAADdIh/AAIAAnpIBaAAQBZAAAgAHQAgAHAUAcQAUAdAAA/QAAA5gOATQgOAVgqADQAmAJANAQQANAPADAOQADAMAAA8IAACBgAgOg0QAVAAAIgFQAJgGAAghIAAgbQAAgWgIgIQgJgHgVgBg");
	this.shape_67.setTransform(202.825,-99.95);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#006633").s().p("AiID1IAAnpICAAAQAzAAAcAIQAcAIAOAPQAOAQAFAWQAFAWAAAuIAAArQAAAugJAVQgKAWgaALQgaALgqAAIghAAIAADGgAgJgjIAJAAQARAAAHgJQAHgJAAgbIAAgoQAAgZgIgHQgIgJgYAAg");
	this.shape_68.setTransform(171.225,-99.95);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#006633").s().p("AhuD1IAAnpIDUAAIAABiIhVAAIAABdIBPAAIAABcIhPAAIAABsIBeAAIAABig");
	this.shape_69.setTransform(131.85,-99.95);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#006633").s().p("AAYD1IAAijQAAgngGgJQgHgKgZAAIAADdIh/AAIAAnpIBaAAQBZAAAgAHQAgAHAUAcQAUAdAAA/QAAA5gOATQgOAVgqADQAmAJANAQQANAPADAOQADAMAAA8IAACBgAgOg0QAVAAAIgFQAJgGAAghIAAgbQAAgWgIgIQgJgHgVgBg");
	this.shape_70.setTransform(101.625,-99.95);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#006633").s().p("AhuD1IAAnpIDUAAIAABiIhVAAIAABdIBPAAIAABcIhPAAIAABsIBeAAIAABig");
	this.shape_71.setTransform(72.7,-99.95);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#006633").s().p("Ag/D1IAAnpIB/AAIAAHpg");
	this.shape_72.setTransform(50.175,-99.95);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#006633").s().p("ABWD1IAAlKIgtFKIhOAAIgvlDIAAFDIhwAAIAAnpICmAAIAOBoIARB8IAejkICmAAIAAHpg");
	this.shape_73.setTransform(19.05,-99.95);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#006633").s().p("AhuD1IAAnpIDUAAIAABiIhVAAIAABdIBPAAIAABcIhPAAIAABsIBeAAIAABig");
	this.shape_74.setTransform(-15.3,-99.95);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#006633").s().p("AAYD1IAAijQAAgngGgJQgHgKgZAAIAADdIh/AAIAAnpIBaAAQBZAAAgAHQAgAHAUAcQAUAdAAA/QAAA5gOATQgOAVgqADQAmAJANAQQANAPADAOQADAMAAA8IAACBgAgOg0QAVAAAIgFQAJgGAAghIAAgbQAAgWgIgIQgJgHgVgBg");
	this.shape_75.setTransform(-45.525,-99.95);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#006633").s().p("AiID1IAAnpICAAAQAzAAAcAIQAcAIAOAPQAOAQAFAWQAFAWAAAuIAAArQAAAugJAVQgKAWgaALQgaALgqAAIghAAIAADGgAgJgjIAJAAQARAAAHgJQAHgJAAgbIAAgoQAAgZgIgHQgIgJgYAAg");
	this.shape_76.setTransform(-77.125,-99.95);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#006633").s().p("AhtD1IAAnpIDTAAIAABiIhVAAIAABdIBQAAIAABcIhQAAIAABsIBdAAIAABig");
	this.shape_77.setTransform(-116.5,-99.95);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#006633").s().p("AiTD1IAAnpIB/AAQA7AAAfAKQAfAIATAdQATAdAAA/QAAArgNASQgOAQgnAKQAsAKAQAVQAPAYAAAvIAAAuQAAAygLAYQgLAXgZAJQgZAJhMAAgAgUChQAagBAIgHQAHgIAAgdIAAguQAAgggHgHQgGgGgcgBgAgUg0IANAAQASABAFgKQAFgJAAgsQAAgWgEgJQgFgKgGgDQgGgCgUgBg");
	this.shape_78.setTransform(-146.975,-99.95);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#006633").s().p("AhGDzQgfgNgTgaQgTgagEgeQgDgeAAhMIAAhTQAAhKADgeQAEggASgZQASgZAfgOQAggNAoAAQAnAAAgAMQAfAOATAZQATAaAEAeQADAeAABMIAABTQAABKgDAeQgEAfgSAZQgSAagfAOQggANgpAAQgmAAgggMgAgOijQgFAHAAAmIAADjQAAArAEAKQADALAMgBQANAAADgLQAEgMAAgrIAAjgQAAgigEgKQgEgJgLAAQgJgBgGAJg");
	this.shape_79.setTransform(-181.325,-99.95);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#006633").s().p("AiTD1IAAnpIBgAAQBbAAAhAJQAgAIARATQARAUAEAYQAFAXAABGIAACqQAABDgHAWQgGAWgPANQgPAMgYAFQgWAFguAAgAgTChQAbAAAGgLQAGgLAAgxIAAi9QAAgigCgJQgCgKgIgDQgHgGgUAAg");
	this.shape_80.setTransform(-215.2,-99.95);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#006633").s().p("AAfD1IgHhYIgtAAIgHBYIiEAAIBBnpIC3AAIBJHpgAgWBGIArAAQgKhSgKh7QgSCMgFBBg");
	this.shape_81.setTransform(-248.225,-99.95);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#006633").s().p("AhtD1IAAnpIDTAAIAABiIhVAAIAABdIBPAAIAABcIhPAAIAABsIBeAAIAABig");
	this.shape_82.setTransform(104.2,-203.55);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#006633").s().p("Ag/D1IAAmHIhLAAIAAhiIEVAAIAABiIhLAAIAAGHg");
	this.shape_83.setTransform(76.275,-203.55);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#006633").s().p("AAfD1IgHhYIgtAAIgHBYIiEAAIBBnpIC3AAIBJHpgAgWBGIArAAQgKhSgKh7QgSCMgFBBg");
	this.shape_84.setTransform(49.675,-203.55);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#006633").s().p("ABVD1IAAlKIgsFKIhOAAIgvlDIAAFDIhvAAIAAnpIClAAIAPBoIARB8IAdjkIClAAIAAHpg");
	this.shape_85.setTransform(11.7,-203.55);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#006633").s().p("Ag/D1IAAnpIB/AAIAAHpg");
	this.shape_86.setTransform(-19.425,-203.55);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#006633").s().p("AAfD1IhCjfIAADfIhqAAIAAnpIBqAAIBHDcIAAjcIBqAAIAAHpg");
	this.shape_87.setTransform(-45.125,-203.55);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#006633").s().p("AAfD1IgHhYIgtAAIgHBYIiEAAIBBnpIC3AAIBJHpgAgWBGIArAAQgKhSgKh7QgSCMgFBBg");
	this.shape_88.setTransform(-77.625,-203.55);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#006633").s().p("AhtD1IAAnpIDTAAIAABiIhVAAIAABdIBQAAIAABcIhQAAIAABsIBdAAIAABig");
	this.shape_89.setTransform(-116.5,-203.55);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#006633").s().p("AiTD1IAAnpIB/AAQA7AAAfAKQAfAIATAdQATAdAAA/QAAAsgNARQgOAQgnAKQAsAJAQAWQAPAYAAAvIAAAuQAAAxgLAYQgLAYgZAJQgZAJhMAAgAgUChQAagBAIgHQAHgIAAgdIAAguQAAgggHgHQgGgGgcgBgAgUg0IANAAQASABAFgKQAFgJAAgsQAAgXgEgIQgFgKgGgDQgGgCgUAAg");
	this.shape_90.setTransform(-146.975,-203.55);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#006633").s().p("AhGDzQgfgNgTgaQgTgagEgeQgDgeAAhMIAAhTQAAhKADgeQAEggASgZQASgZAfgOQAggOAoAAQAnAAAgAOQAfANATAZQATAaAEAeQADAeAABMIAABTQAABJgDAfQgEAfgSAZQgSAagfAOQggAOgpgBQgmABgggNgAgOijQgFAHAAAmIAADjQAAArAEALQADAKAMgBQANAAADgLQAEgMAAgrIAAjgQAAgigEgKQgEgJgLAAQgJAAgGAIg");
	this.shape_91.setTransform(-181.325,-203.55);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#006633").s().p("AiTD1IAAnpIBgAAQBbAAAhAJQAgAIARATQARAUAEAXQAFAYAABGIAACrQAABCgHAWQgGAWgPANQgPAMgYAFQgWAFguAAgAgTChQAbAAAGgLQAGgLAAgxIAAi9QAAgigCgJQgCgJgIgFQgHgEgUAAg");
	this.shape_92.setTransform(-215.2,-203.55);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#006633").s().p("AAfD1IgHhYIgtAAIgHBYIiEAAIBBnpIC3AAIBJHpgAgWBGIArAAQgKhSgKh7QgSCMgFBBg");
	this.shape_93.setTransform(-248.225,-203.55);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#006633").s().p("AhSDsQglgTgKgfQgMgeAAg3IAAggIB2AAIAAA8QAAAbAGAIQAEAJANAAQAMAAAGgKQAHgKAAgVQgBgqgMgOQgLgNgvggQgwgfgPgNQgPgOgLgZQgKgZABgnQAAg5AOgaQAOgaAggPQAhgPAsAAQAxAAAkAQQAiAQAMAZQALAZAAA6IAAATIh2AAIAAgkQgBgZgEgIQgEgGgKAAQgMgBgFAKQgHAJAAAUQAAAYAIANQAFAMAeARQBUAzAXAfQAVAgAABIQABA1gMAZQgNAZgjAQQgjASgvgBQgyABgkgUg");
	this.shape_94.setTransform(241.25,-302.65);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#006633").s().p("Ag/D1IAAmHIhLAAIAAhiIEVAAIAABiIhLAAIAAGHg");
	this.shape_95.setTransform(210.875,-302.65);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#006633").s().p("AhaDrQgkgUgMgkQgMgkAAhIIAAiOQABg1ADgaQADgbASgZQASgZAhgNQAfgPAqAAQA3AAAlAXQAkAVAMAhQAMAgAABEIAAAvIiAAAIAAhVQAAglgEgJQgEgJgOAAQgPAAgEALQgFALAAAlIAADjQAAAkAFALQAEAKAOABQAPgBAEgKQAEgLAAgpIAAg+ICAAAIAAATQAABNgLAfQgLAhglAXQglAYg2AAQg2ABglgVg");
	this.shape_96.setTransform(179.5,-302.65);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#006633").s().p("AhtD1IAAnpIDTAAIAABiIhVAAIAABdIBPAAIAABcIhPAAIAABsIBeAAIAABig");
	this.shape_97.setTransform(150.1,-302.65);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#006633").s().p("AhrD1IAAnpIDXAAIAABiIhYAAIAABdIBOAAIAABcIhOAAIAADOg");
	this.shape_98.setTransform(125.2,-302.65);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#006633").s().p("AhrD1IAAnpIDXAAIAABiIhYAAIAABdIBOAAIAABcIhOAAIAADOg");
	this.shape_99.setTransform(100.55,-302.65);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#006633").s().p("AhuD1IAAnpIDUAAIAABiIhVAAIAABdIBPAAIAABcIhPAAIAABsIBeAAIAABig");
	this.shape_100.setTransform(75.05,-302.65);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#006633").s().p("AAYD1IAAijQAAgngGgKQgHgJgZAAIAADdIh/AAIAAnpIBaAAQBZAAAgAHQAgAHAUAcQAUAdAAA+QAAA6gOAUQgOATgqAEQAmAKANAOQANAQADAOQADAMAAA8IAACBgAgOgzQAVgBAIgFQAJgGAAghIAAgbQAAgWgIgIQgJgHgVAAg");
	this.shape_101.setTransform(33.875,-302.65);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#006633").s().p("AhuD1IAAnpIDUAAIAABiIhVAAIAABdIBPAAIAABcIhPAAIAABsIBeAAIAABig");
	this.shape_102.setTransform(4.95,-302.65);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#006633").s().p("Ag/D1IAAmHIhLAAIAAhiIEVAAIAABiIhLAAIAAGHg");
	this.shape_103.setTransform(-22.975,-302.65);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#006633").s().p("AhrD1IAAnpIDXAAIAABiIhZAAIAABdIBPAAIAABcIhPAAIAADOg");
	this.shape_104.setTransform(-48.55,-302.65);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#006633").s().p("AAfD1IgHhYIgtAAIgHBYIiEAAIBBnpIC3AAIBJHpgAgWBGIArAAQgKhSgKh7QgSCMgFBBg");
	this.shape_105.setTransform(-77.625,-302.65);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#006633").s().p("AhtD1IAAnpIDTAAIAABiIhVAAIAABdIBQAAIAABcIhQAAIAABsIBdAAIAABig");
	this.shape_106.setTransform(-116.5,-302.65);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#006633").s().p("AiTD1IAAnpIB/AAQA7AAAfAKQAfAIATAdQATAdAAA/QAAArgNASQgOAQgnAKQAsAKAQAVQAPAYAAAvIAAAuQAAAygLAXQgLAZgZAIQgZAJhMAAgAgUChQAagBAIgHQAHgIAAgdIAAgvQAAgfgHgHQgGgGgcgBgAgUgzIANAAQASAAAFgJQAFgKAAgsQAAgXgEgJQgFgJgGgDQgGgCgUAAg");
	this.shape_107.setTransform(-146.975,-302.65);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#006633").s().p("AhGDzQgfgNgTgaQgTgagEgeQgDgfAAhLIAAhTQAAhKADgfQAEgfASgZQASgZAfgOQAggOAoAAQAnAAAgAOQAfANATAZQATAaAEAeQADAeAABMIAABTQAABJgDAfQgEAfgSAZQgSAagfAOQggAOgpgBQgmABgggNgAgOikQgFAIAAAmIAADkQAAAqAEALQADAKAMAAQANAAADgMQAEgMAAgrIAAjgQAAgjgEgJQgEgKgLABQgJAAgGAHg");
	this.shape_108.setTransform(-181.325,-302.65);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#006633").s().p("AiTD1IAAnpIBgAAQBbAAAhAIQAgAJARATQARAUAEAXQAFAYAABGIAACrQAABBgHAXQgGAWgPAMQgPANgYAFQgWAFguAAgAgTChQAbAAAGgLQAGgLAAgxIAAi9QAAgigCgJQgCgJgIgFQgHgEgUAAg");
	this.shape_109.setTransform(-215.2,-302.65);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#006633").s().p("AAfD1IgHhYIgtAAIgHBYIiEAAIBBnpIC3AAIBJHpgAgWBGIArAAQgKhSgKh7QgSCMgFBBg");
	this.shape_110.setTransform(-248.225,-302.65);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#006633").s().p("AiID1IAAnpICAAAQAzAAAcAIQAcAIAOAPQAOAQAFAWQAFAWAAAuIAAArQAAAugJAVQgKAWgaALQgaALgqAAIghAAIAADGgAgJgjIAJAAQARAAAHgJQAHgJAAgbIAAgoQAAgZgIgHQgIgJgYAAg");
	this.shape_111.setTransform(185.125,-412.7);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#006633").s().p("AhGDzQgfgNgTgaQgTgagEgeQgDgeAAhMIAAhTQAAhKADgeQAEggASgZQASgZAfgOQAggNAoAAQAnAAAgAMQAfAOATAZQATAaAEAeQADAeAABMIAABTQAABKgDAeQgEAfgSAZQgSAagfAOQggANgpAAQgmAAgggMgAgOijQgFAHAAAmIAADjQAAArAEAKQADALAMgBQANAAADgLQAEgMAAgrIAAjgQAAgigEgKQgEgJgLAAQgJgBgGAJg");
	this.shape_112.setTransform(151.875,-412.7);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#006633").s().p("AATD1IAAjOIglAAIAADOIh/AAIAAnpIB/AAIAACvIAlAAIAAivIB/AAIAAHpg");
	this.shape_113.setTransform(117.75,-412.7);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#006633").s().p("AhSDsQgkgUgMgdQgKgfgBg3IAAgfIB2AAIAAA7QAAAcAGAHQAFAJAMgBQAMABAHgLQAFgKABgTQAAgsgNgNQgMgNguggQgvgfgQgNQgPgOgKgaQgLgZABgmQAAg5AOgaQAOgaAggPQAggOAtAAQAyAAAjAPQAiARAMAYQALAYAAA7IAAATIh2AAIAAgkQgBgagEgGQgFgIgJABQgMAAgFAJQgHAKABASQgBAZAIAMQAGANAdARQBUAzAXAfQAVAhAABHQABA1gMAZQgNAYgjARQgjASgvgBQgyAAgkgTg");
	this.shape_114.setTransform(84.55,-412.7);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#006633").s().p("AhGDzQgfgNgTgaQgTgagEgeQgDgeAAhMIAAhTQAAhKADgeQAEggASgZQASgZAfgOQAggNAoAAQAnAAAgAMQAfAOATAZQATAaAEAeQADAeAABMIAABTQAABKgDAeQgEAfgSAZQgSAagfAOQggANgpAAQgmAAgggMgAgOijQgFAHAAAmIAADjQAAArAEAKQADALAMgBQANAAADgLQAEgMAAgrIAAjgQAAgigEgKQgEgJgLAAQgJgBgGAJg");
	this.shape_115.setTransform(51.525,-412.7);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#006633").s().p("Ag/D1IAAmHIhLAAIAAhiIEVAAIAABiIhLAAIAAGHg");
	this.shape_116.setTransform(20.275,-412.7);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#006633").s().p("AhGDzQgfgNgTgaQgTgagEgeQgDgeAAhMIAAhTQAAhKADgeQAEggASgZQASgZAfgOQAggNAoAAQAnAAAgAMQAfAOATAZQATAaAEAeQADAeAABMIAABTQAABKgDAeQgEAfgSAZQgSAagfAOQggANgpAAQgmAAgggMgAgOijQgFAHAAAmIAADjQAAArAEAKQADALAMgBQANAAADgLQAEgMAAgrIAAjgQAAgigEgKQgEgJgLAAQgJgBgGAJg");
	this.shape_117.setTransform(-10.975,-412.7);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#006633").s().p("AATD1IAAjOIglAAIAADOIiAAAIAAnpICAAAIAACvIAlAAIAAivICAAAIAAHpg");
	this.shape_118.setTransform(-45.1,-412.7);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#006633").s().p("AiID1IAAnpICAAAQAzAAAcAIQAcAIAOAPQAOAQAFAWQAFAWAAAuIAAArQAAAugJAVQgKAWgaALQgaALgqAAIghAAIAADGgAgJgjIAJAAQARAAAHgJQAHgJAAgbIAAgoQAAgZgIgHQgIgJgYAAg");
	this.shape_119.setTransform(-77.125,-412.7);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#006633").s().p("AhtD1IAAnpIDTAAIAABiIhVAAIAABdIBQAAIAABcIhQAAIAABsIBdAAIAABig");
	this.shape_120.setTransform(-116.5,-412.7);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#006633").s().p("AiTD1IAAnpIB/AAQA7AAAfAKQAfAIATAdQATAdAAA/QAAArgNASQgOAQgnAKQAsAKAQAVQAPAYAAAvIAAAuQAAAygLAYQgLAXgZAJQgZAJhMAAgAgUChQAagBAIgHQAHgIAAgdIAAguQAAgggHgHQgGgGgcgBgAgUg0IANAAQASABAFgKQAFgJAAgsQAAgWgEgJQgFgKgGgDQgGgCgUgBg");
	this.shape_121.setTransform(-146.975,-412.7);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#006633").s().p("AhGDzQgfgNgTgaQgTgagEgeQgDgeAAhMIAAhTQAAhKADgeQAEggASgZQASgZAfgOQAggNAoAAQAnAAAgAMQAfAOATAZQATAaAEAeQADAeAABMIAABTQAABKgDAeQgEAfgSAZQgSAagfAOQggANgpAAQgmAAgggMgAgOijQgFAHAAAmIAADjQAAArAEAKQADALAMgBQANAAADgLQAEgMAAgrIAAjgQAAgigEgKQgEgJgLAAQgJgBgGAJg");
	this.shape_122.setTransform(-181.325,-412.7);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#006633").s().p("AiTD1IAAnpIBgAAQBbAAAhAJQAgAIARATQARAUAEAYQAFAXAABGIAACqQAABDgHAWQgGAWgPANQgPAMgYAFQgWAFguAAgAgTChQAbAAAGgLQAGgLAAgxIAAi9QAAgigCgJQgCgKgIgDQgHgGgUAAg");
	this.shape_123.setTransform(-215.2,-412.7);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#006633").s().p("AAfD1IgHhYIgtAAIgHBYIiEAAIBBnpIC3AAIBJHpgAgWBGIArAAQgKhSgKh7QgSCMgFBBg");
	this.shape_124.setTransform(-248.225,-412.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-266,-452.7,532.1,905.5);


(lib.Tween15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#006633").s().p("Egc4BDEIAAlEMA1jAAAIAAFEgEgc4A1/IAAlEMAkDAAAIAAFEgEgc4AkRIAAlEMArNAAAIAAFEgA84TaIAAlEIZuAAIAAFEgA84CiIAAlDMAuYAAAIAAFDgA84tEIAAlEMAmzAAAIAAFEgA849gIAAlEMAgdAAAIAAFEgEgc4gsRIAAlEMAwmAAAIAAFEgEgc3g9/IAAlEMA5wAAAIAAFEg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-184.9,-429.1,369.8,858.3);


(lib.Tween14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EgiJBDEIAAlEMBETAAAIAAFEgEgiJA1/IAAlEMBETAAAIAAFEgEgiJAkRIAAlEMBETAAAIAAFEgEgiJATaIAAlEMBETAAAIAAFEgEgiJACiIAAlDMBETAAAIAAFDgEgiJgNEIAAlEMBETAAAIAAFEgEgiJgdgIAAlEMBETAAAIAAFEgEgiJgsRIAAlEMBETAAAIAAFEgEgiJg9/IAAlEMBETAAAIAAFEg");
	this.shape.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-218.6,-429.1,437.29999999999995,858.3);


(lib.Tween12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#66CCFF").s().p("EiWCBRQIAArOMErcAAAIAALOgEiWCAFqMAAAhW5MEsFAAAMAAABW5g");
	this.shape.setTransform(0,22.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-960.2,-497.9,1920.5,1040);


(lib.Tween11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000066").s().p("AAyGVIhslwIAAFwIiwAAIAAspICwAAIB1FtIAAltICwAAIAAMpg");
	this.shape.setTransform(810.725,0.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000066").s().p("AiJGMQgvgZgYgnQgYglgGgqQgGgqAAhTIAAjwQAAh1ANg0QAMg0A8gsQA7gsBeAAQBbAAA9AmQA9AmATA1QATA0AABjIAAAjIjTAAIAAhKQAAhFgGgRQgGgSgWAAQgTAAgHAPQgHAPAAA+IAAGEQAAA2AHASQAHARAUAAQAXAAAIgTQAIgUAAg5IAAhfIgpAAIAAh7ID2AAIAAGyIiFAAIgTg6QgWAmghASQghATgrAAQg1AAgugag");
	this.shape_1.setTransform(754.525,0.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000066").s().p("AhoGVIAAspIDRAAIAAMpg");
	this.shape_2.setTransform(711.675,0.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000066").s().p("AiIGGQg8gggTgxQgSgyAAhbIAAg1IDDAAIAABiQAAAuAJANQAIANAVAAQAUAAAKgRQAKgQAAggQAAhIgTgWQgUgWhOg0QhOg0gagWQgZgXgRgqQgRgqAAhAQAAhdAYgrQAYgsA1gYQA1gYBLAAQBRAAA6AaQA5AbATApQATAnAABhIAAAgIjEAAIAAg8QAAgqgHgMQgIgLgQAAQgTAAgKAPQgKAQAAAgQAAAoALAUQALAVAwAdQCMBUAlA0QAlA2AAB3QAABWgVAqQgUApg6AbQg6AchNAAQhUAAg7ggg");
	this.shape_3.setTransform(670.525,0.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000066").s().p("Ai2GVIAAspIFeAAIAACiIiMAAIAACaICDAAIAACZIiDAAIAACyICaAAIAACig");
	this.shape_4.setTransform(623.9,0.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000066").s().p("AjzGVIAAspICeAAQCXAAA2AOQA1AOAdAgQAcAgAHAnQAHAoAAByIAAEcQAABsgKAmQgLAkgaAVQgZAUgmAJQglAIhLAAgAghELQAtgBALgSQAKgSAAhRIAAk6QAAg3gEgQQgDgPgMgHQgNgHgiAAg");
	this.shape_5.setTransform(573.45,0.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000066").s().p("AAyGVIhslwIAAFwIiwAAIAAspICwAAIB1FtIAAltICwAAIAAMpg");
	this.shape_6.setTransform(499.025,0.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000066").s().p("Ah0GRQg0gWgfgqQgggrgGgxQgGgzAAh9IAAiJQAAh6AGgzQAGgzAegqQAegqA0gXQAzgWBEAAQBBAAA0AWQAzAUAgArQAgArAGAxQAGAzAAB9IAACJQAAB7gGAyQgGAzgeAqQgfAqgzAXQg0AWhEAAQhAAAg0gVgAgXkPQgJAMAAA/IAAF6QAABGAGAQQAFARAVAAQAVAAAGgTQAGgTAAhHIAAl0QAAg4gGgQQgHgQgTAAQgQAAgIANg");
	this.shape_7.setTransform(443.275,0.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000066").s().p("AhoGVIAAspIDRAAIAAMpg");
	this.shape_8.setTransform(400.525,0.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000066").s().p("AhoGVIAAqHIh9AAIAAiiIHLAAIAACiIh9AAIAAKHg");
	this.shape_9.setTransform(362.15,0.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000066").s().p("AAyGVIgLiSIhKAAIgNCSIjZAAIBrspIEvAAIB5MpgAgmB0IBIAAQgQiJgQjLQggDpgIBrg");
	this.shape_10.setTransform(318.175,0.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000066").s().p("ACNGVIAAoiIhKIiIiBAAIhOoWIAAIWIi4AAIAAspIEQAAQANBJANBjIAcDOIAwl6IETAAIAAMpg");
	this.shape_11.setTransform(255.45,0.35);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000066").s().p("AhoGVIAAspIDRAAIAAMpg");
	this.shape_12.setTransform(203.975,0.35);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000066").s().p("AAyGVIhslwIAAFwIiwAAIAAspICwAAIB1FtIAAltICwAAIAAMpg");
	this.shape_13.setTransform(161.525,0.35);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000066").s().p("AAyGVIgLiSIhKAAIgNCSIjZAAIBrspIEvAAIB5MpgAgmB0IBIAAQgQiJgQjLQggDpgIBrg");
	this.shape_14.setTransform(107.825,0.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000066").s().p("AAyGVIhslwIAAFwIiwAAIAAspICwAAIB1FtIAAltICwAAIAAMpg");
	this.shape_15.setTransform(35.925,0.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000066").s().p("AhoGVIAAspIDRAAIAAMpg");
	this.shape_16.setTransform(-6.575,0.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000066").s().p("Ai1GVIAAspIFeAAIAACiIiNAAIAACaICEAAIAACZIiEAAIAACyICaAAIAACig");
	this.shape_17.setTransform(-59.45,0.35);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000066").s().p("Ai1GVIAAspIFeAAIAACiIiNAAIAACaICEAAIAACZIiEAAIAACyICaAAIAACig");
	this.shape_18.setTransform(-102,0.35);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000066").s().p("AAnGVIAAkNQAAhBgKgPQgKgQgrAAIAAFtIjSAAIAAspICVAAQCUAAA1AMQA0ALAiAvQAhAwAABnQAABfgYAgQgXAhhFAGQA+AQAWAZQAWAaAFAWQAFAVAABjIAADVgAgYhVQAjAAAOgKQAOgKAAg1IAAgtQAAgngNgMQgOgMgkABg");
	this.shape_19.setTransform(-151.925,0.35);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000066").s().p("AiJGMQgvgZgYgnQgYglgGgqQgGgqAAhTIAAjwQAAh1ANg0QAMg0A8gsQA7gsBeAAQBbAAA9AmQA9AmATA1QATA0AABjIAAAjIjTAAIAAhKQAAhFgGgRQgGgSgWAAQgTAAgHAPQgHAPAAA+IAAGEQAAA2AHASQAHARAUAAQAXAAAIgTQAIgUAAg5IAAhfIgpAAIAAh7ID2AAIAAGyIiFAAIgTg6QgWAmghASQghATgrAAQg1AAgugag");
	this.shape_20.setTransform(-208.125,0.35);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000066").s().p("Ai2GVIAAspIFeAAIAACiIiMAAIAACaICDAAIAACZIiDAAIAACyICaAAIAACig");
	this.shape_21.setTransform(-256.3,0.35);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000066").s().p("AjzGVIAAspICeAAQCXAAA2AOQA1AOAdAgQAcAgAHAnQAHAoAAByIAAEcQAABsgKAmQgLAkgaAVQgZAUgmAJQglAIhLAAgAghELQAtgBALgSQAKgSAAhRIAAk6QAAg3gEgQQgDgPgMgHQgNgHgiAAg");
	this.shape_22.setTransform(-306.75,0.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000066").s().p("AiIGGQg8gggTgxQgSgyAAhbIAAg1IDDAAIAABiQAAAuAJANQAIANAVAAQAUAAAKgRQAKgQAAggQAAhIgTgWQgUgWhOg0QhOg0gagWQgZgXgRgqQgRgqAAhAQAAhdAYgrQAYgsA1gYQA1gYBLAAQBRAAA6AaQA5AbATApQATAnAABhIAAAgIjEAAIAAg8QAAgqgHgMQgIgLgQAAQgTAAgKAPQgKAQAAAgQAAAoALAUQALAVAwAdQCMBUAlA0QAlA2AAB3QAABWgVAqQgUApg6AbQg6AchNAAQhUAAg7ggg");
	this.shape_23.setTransform(-379.875,0.35);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000066").s().p("AgxCCIgbiHIAAh8ICYAAIAAB8IgWCHg");
	this.shape_24.setTransform(-415.85,-27.125);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000066").s().p("AAnGVIAAkNQAAhBgKgPQgKgQgrAAIAAFtIjSAAIAAspICVAAQCUAAA1AMQA0ALAiAvQAhAwAABnQAABfgYAgQgXAhhFAGQA+AQAWAZQAWAaAFAWQAFAVAABjIAADVgAgYhVQAjAAAOgKQAOgKAAg1IAAgtQAAgngNgMQgOgMgkABg");
	this.shape_25.setTransform(-452.775,0.35);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000066").s().p("Ah0GRQg0gWgfgqQgggrgGgxQgGgzAAh9IAAiJQAAh6AGgzQAGgzAegqQAegqA0gXQAzgWBEAAQBBAAA0AWQAzAUAgArQAgArAGAxQAGAzAAB9IAACJQAAB7gGAyQgGAzgeAqQgfAqgzAXQg0AWhEAAQhAAAg0gVgAgXkPQgJAMAAA/IAAF6QAABGAGAQQAFARAVAAQAVAAAGgTQAGgTAAhHIAAl0QAAg4gGgQQgHgQgTAAQgQAAgIANg");
	this.shape_26.setTransform(-508.525,0.35);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000066").s().p("AioGVIAAspIDRAAIAAKHICAAAIAACig");
	this.shape_27.setTransform(-552.825,0.35);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000066").s().p("Ai1GVIAAspIFeAAIAACiIiNAAIAACaICEAAIAACZIiEAAIAACyICaAAIAACig");
	this.shape_28.setTransform(-594.05,0.35);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000066").s().p("AAfGVIAAlUIg+AAIAAFUIjSAAIAAspIDSAAIAAEiIA+AAIAAkiIDTAAIAAMpg");
	this.shape_29.setTransform(-644.925,0.35);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000066").s().p("AiVGFQg8gigUg7QgTg8AAh3IAAjsQAAhXAGgrQAGgtAegoQAegoA0gYQA1gXBFAAQBbAAA9AkQA9AkATA1QATA3AABwIAABOIjTAAIAAiNQAAg9gHgQQgGgPgYAAQgZAAgHATQgGASAAA+IAAF3QAAA7AGASQAIASAXAAQAXAAAIgSQAHgSAAhCIAAhnIDTAAIAAAgQAAB+gRA1QgTA0g8AoQg+AnhZAAQhbAAg8ghg");
	this.shape_30.setTransform(-701.6,0.35);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000066").s().p("AAyGVIgLiSIhKAAIgNCSIjZAAIBrspIEvAAIB5MpgAgmB0IBIAAQgQiJgQjLQggDpgIBrg");
	this.shape_31.setTransform(-756.075,0.35);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000066").s().p("Aj0GVIAAspIDSAAQBiAAA0APQAzAQAfAvQAgAvAABpQAABHgWAdQgXAchBAPQBJARAaAlQAaAmAABPIAABLQAABSgSAoQgUAngpAPQgpAOh+AAgAgiELQAsgCAMgNQAMgMAAgxIAAhMQAAg0gLgLQgLgLgugBgAgihVIAVAAQAeAAAJgQQAIgQAAhIQAAglgHgQQgHgPgLgEQgKgEghAAg");
	this.shape_32.setTransform(-810.025,0.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-842,-65.8,1684.1,131.6);


(lib.Tween10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.KRUpngcopy();
	this.instance.setTransform(-960,-540);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-960,-540,1920,1080);


(lib.Tween8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F79021").s().p("AhRD+IAAhCQAcAAAIgDQAHgDADgJQADgIAAgjIAAkDQAAgmgEgHQgEgJgHgBQgIgDgaAAIAAhCIAoAAQA1AAAbAKQAaAKAIAUQAJAUAABAIAAEDQAABAgJAUQgIAUgaAKQgaAKg2AAg");
	this.shape.setTransform(228.725,314.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F79021").s().p("AhdD0QgmgVgMglQgMgmAAhKIAAiUQAAg3AEgbQADgcATgZQATgZAhgPQAhgPArAAQA5AAAmAXQAmAXAMAhQAMAiAABHIAAAwIiEAAIAAhYQAAgmgEgKQgEgKgPAAQgPAAgFAMQgEAMAAAmIAADrQAAAlAEAMQAFALAOAAQAPAAAFgLQAEgMAAgpIAAhAICEAAIAAATQAABPgLAhQgLAhgmAZQgmAZg4AAQg5AAgmgVg");
	this.shape_1.setTransform(197.525,314.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F79021").s().p("AAgD+IgHhcIguAAIgJBcIiIAAIBDn7IC/AAIBLH7gAgXBIIAtAAQgLhVgJh/QgUCRgFBDg");
	this.shape_2.setTransform(159.2,314.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F79021").s().p("AAgD+IgHhcIguAAIgIBcIiJAAIBDn7IC+AAIBMH7gAgXBIIAtAAQgKhVgLh/QgTCRgFBDg");
	this.shape_3.setTransform(120.75,314.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F79021").s().p("AAYD+Ig0jaIAADaIiEAAIAAn7ICEAAIAADGIA6jGIB8AAIhMDlIBTEWg");
	this.shape_4.setTransform(83.25,314.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F79021").s().p("AAqD+Qg2AAgagKQgagKgIgUQgJgUAAhAIAAkDQAAhAAIgUQAIgUAbgKQAbgKA1AAIAoAAIAABCQgaAAgIADQgIABgDAJQgEAHAAAmIAAEDQAAAjADAIQADAJAHADQAIADAcAAIAABCg");
	this.shape_5.setTransform(51.025,314.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#F79021").s().p("AAfD+IhDjnIAADnIhvAAIAAn7IBvAAIBJDkIAAjkIBvAAIAAH7g");
	this.shape_6.setTransform(3.15,314.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F79021").s().p("AhID8QghgOgUgaQgTgbgEgfQgEggAAhOIAAhWQAAhNAEggQAEggASgaQATgaAhgOQAggPAqAAQApAAAgAOQAhANATAbQAUAaAEAgQAEAfAABPIAABWQAABMgDAgQgEAggUAaQgSAbghAOQggAOgrAAQgoAAgggNgAgOipQgGAHAAAoIAADsQAAAsAEALQADAKANAAQANAAAEgMQAEgMgBgtIAAjoQABgkgEgJQgEgLgNAAQgJAAgFAJg");
	this.shape_7.setTransform(-35.95,314.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F79021").s().p("AhBD+IAAn7ICDAAIAAH7g");
	this.shape_8.setTransform(-66.9,314.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F79021").s().p("AhBD+IAAmWIhOAAIAAhlIEfAAIAABlIhOAAIAAGWg");
	this.shape_9.setTransform(-95.125,314.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F79021").s().p("AhBD+IAAn7ICDAAIAAH7g");
	this.shape_10.setTransform(-123.35,314.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F79021").s().p("AhBD+IAAmWIhOAAIAAhlIEfAAIAABlIhOAAIAAGWg");
	this.shape_11.setTransform(-151.575,314.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F79021").s().p("AhxD+IAAn7IDaAAIAABlIhYAAIAABhIBTAAIAABgIhTAAIAABvIBhAAIAABmg");
	this.shape_12.setTransform(-182.35,314.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#F79021").s().p("AiND+IAAn7ICFAAQA1AAAdAJQAdAIAOAQQAPAQAFAXQAFAXAAAvIAAAtQAAAwgKAVQgKAWgaAMQgbANgsAAIgiAAIAADMgAgJglIAJAAQASABAHgKQAHgJAAgbIAAgrQAAgagIgIQgJgHgYAAg");
	this.shape_13.setTransform(-215.925,314.7);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#F79021").s().p("ABYD+IAAlWIguFWIhRAAIgwlOIAAFOIh0AAIAAn7ICrAAQAIAuAIA+IASCBIAejtICsAAIAAH7g");
	this.shape_14.setTransform(-259.975,314.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#F79021").s().p("AhID8QghgOgUgaQgTgbgEgfQgEggAAhOIAAhWQAAhNAEggQAEggASgaQAUgaAfgOQAhgPAqAAQAoAAAiAOQAgANATAbQAUAaAEAgQAEAfAABPIAABWQAABMgEAgQgDAggUAaQgTAbgfAOQghAOgrAAQgoAAgggNgAgOipQgGAHAAAoIAADsQAAAsAEALQADAKANAAQANAAAEgMQAEgMAAgtIAAjoQAAgkgEgJQgEgLgNAAQgJAAgFAJg");
	this.shape_15.setTransform(-304.75,314.675);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#F79021").s().p("AhdD0QgmgVgMglQgMgmAAhKIAAiUQAAg3AEgbQADgcATgZQATgZAhgPQAhgPArAAQA5AAAmAXQAmAXAMAhQAMAiAABHIAAAwIiEAAIAAhYQAAgmgEgKQgEgKgPAAQgPAAgFAMQgEAMAAAmIAADrQAAAlAEAMQAFALAOAAQAPAAAFgLQAEgMAAgpIAAhAICEAAIAAATQAABPgLAhQgLAhgmAZQgmAZg4AAQg5AAgmgVg");
	this.shape_16.setTransform(-344.175,314.675);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#F79021").s().p("AAfD+IhDjnIAADnIhvAAIAAn7IBvAAIBJDkIAAjkIBuAAIAAH7g");
	this.shape_17.setTransform(-399.05,314.7);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#F79021").s().p("AhID8QghgOgTgaQgVgbgDgfQgEggAAhOIAAhWQAAhNAEggQADggAUgaQATgaAfgOQAhgPAqAAQAoAAAiAOQAfANAVAbQATAaAEAgQAEAfAABPIAABWQAABMgEAgQgEAggSAaQgUAbggAOQggAOgrAAQgoAAgggNgAgOipQgGAHAAAoIAADsQAAAsAEALQAEAKAMAAQANAAAEgMQADgMABgtIAAjoQgBgkgDgJQgEgLgMAAQgKAAgFAJg");
	this.shape_18.setTransform(-438.2,314.675);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#F79021").s().p("AhBD+IAAn7ICDAAIAAH7g");
	this.shape_19.setTransform(-469.15,314.7);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#F79021").s().p("AhBD+IAAmWIhOAAIAAhlIEfAAIAABlIhOAAIAAGWg");
	this.shape_20.setTransform(-497.375,314.7);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#F79021").s().p("AAgD+IgHhcIguAAIgIBcIiJAAIBDn7IC+AAIBMH7gAgXBIIAsAAQgJhVgLh/QgTCRgFBDg");
	this.shape_21.setTransform(-529.15,314.7);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#F79021").s().p("ABYD+IAAlWIguFWIhRAAIgwlOIAAFOIh0AAIAAn7ICrAAQAIAuAIA+IASCBIAejtICsAAIAAH7g");
	this.shape_22.setTransform(-572.625,314.7);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#F79021").s().p("AhBD+IAAn7ICDAAIAAH7g");
	this.shape_23.setTransform(-609.05,314.7);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#F79021").s().p("AAgD+IhEjnIAADnIhuAAIAAn7IBuAAIBJDkIAAjkIBuAAIAAH7g");
	this.shape_24.setTransform(-639.85,314.7);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#F79021").s().p("AAfD+IgGhcIgvAAIgIBcIiIAAIBDn7IC/AAIBLH7gAgXBIIAtAAQgLhVgJh/QgUCRgFBDg");
	this.shape_25.setTransform(-677.7,314.7);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#F79021").s().p("Ag+D+IAAi4IhdlDIB5AAQAdCUAEA0QAKhRAah3IB5AAIhgFDIAAC4g");
	this.shape_26.setTransform(-27.85,234.2);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#F79021").s().p("ABYD+IAAlWIguFWIhRAAIgwlOIAAFOIh0AAIAAn7ICrAAQAIAtAIA/IASCBIAejtICsAAIAAH7g");
	this.shape_27.setTransform(-70.225,234.2);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#F79021").s().p("AhyD+IAAn7IDcAAIAABmIhYAAIAABgIBSAAIAABfIhSAAIAABxIBhAAIAABlg");
	this.shape_28.setTransform(-109.95,234.2);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#F79021").s().p("AiYD+IAAn7IBiAAQBgAAAhAIQAiAJARAVQASATAFAaQAEAYAABIIAACxQAABFgHAWQgGAYgQANQgQAMgYAGQgXAFgvAAgAgUCnQAcAAAGgLQAHgMgBgzIAAjEQAAgjgCgKQgBgJgJgEQgIgFgUAAg");
	this.shape_29.setTransform(-145.75,234.2);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#F79021").s().p("AAfD+IgGhbIgvAAIgIBbIiIAAIBDn7IC+AAIBMH7gAgXBJIAsAAQgKhWgKh/QgTCRgFBEg");
	this.shape_30.setTransform(-184.2,234.2);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#F79021").s().p("AhdD0QgmgVgMglQgMgmAAhKIAAiUQAAg3AEgbQADgcATgZQATgZAhgPQAhgPArAAQA5AAAmAXQAmAXAMAhQAMAiAABHIAAAwIiEAAIAAhYQAAgmgEgKQgEgKgPAAQgPAAgFAMQgEAMAAAmIAADrQAAAlAEAMQAFALAOAAQAPAAAFgLQAEgMAAgpIAAhAICEAAIAAATQAABPgLAhQgLAhgmAZQgmAZg4AAQg5AAgmgVg");
	this.shape_31.setTransform(-222.425,234.175);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#F79021").s().p("AAgD+IgHhbIguAAIgIBbIiJAAIBDn7IC+AAIBMH7gAgXBJIAtAAQgLhWgKh/QgTCRgFBEg");
	this.shape_32.setTransform(-260.75,234.2);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#F79021").s().p("AhLD0QgigPgRgYQgSgYgDgbQgDgbAAhWIAAkrICEAAIAAF8QAAAhAEAJQAEAJAKAAQAMAAADgKQAEgKAAgmIAAl1ICEAAIAAFSQAAA6gEAYQgEAXgSAZQgTAYgeANQgeAMgpAAQgtAAgjgPg");
	this.shape_33.setTransform(-314.35,234.725);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#F79021").s().p("AAYD+IAAipQAAgpgFgJQgHgKgaAAIAADlIiFAAIAAn7IBeAAQBcAAAiAHQAgAHAWAeQAUAdABBCQgBA7gPAVQgOATgrAFQAnAKAOAPQANAQADAOQADANABA+IAACGgAgOg1QAVAAAJgGQAIgGAAgiIAAgcQAAgYgIgIQgJgHgVAAg");
	this.shape_34.setTransform(-353.25,234.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#F79021").s().p("AAYD+Ig0jaIAADaIiEAAIAAn7ICEAAIAADFIA6jFIB8AAIhMDlIBTEWg");
	this.shape_35.setTransform(-390.5,234.2);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#F79021").s().p("AAfD+IhDjnIAADnIhvAAIAAn7IBvAAIBJDlIAAjlIBuAAIAAH7g");
	this.shape_36.setTransform(-446.3,234.2);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#F79021").s().p("AhBD+IAAn7ICDAAIAAH7g");
	this.shape_37.setTransform(-477.1,234.2);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#F79021").s().p("AhED+QgegLgRgWQgTgXgHgYQgHgZgBg2IAAiwQAAhGANgjQAMgjAkgVQAkgVAzAAQAoAAAiAPQAgAPARAVQAQAVAGAaQAGAagBA6IAACpQAAA5gFAbQgHAagTAXQgVAXgcAKQgcAKgiAAQgsAAgfgKgAgRitQgEAKgBAnIAAD3QABAtAEAJQAEAJANAAQAOAAAFgLQAEgLAAglIAAj7QAAgogEgKQgEgKgOAAQgOAAgEALg");
	this.shape_38.setTransform(-523.25,234.175);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#F79021").s().p("AgTD+IAAkPQAAg8gDgLQgCgMgNgGQgNgGgsgBIgMAAIAAg7QBcgTAug+IBLAAIAAH7g");
	this.shape_39.setTransform(-558,234.2);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#F79021").s().p("AiND+IAAn7ICFAAQA1AAAdAIQAdAJAOAQQAPAQAFAXQAFAXAAAvIAAAsQAAAxgKAVQgKAWgaANQgbAMgsgBIgiAAIAADNgAgJglIAJABQASgBAHgIQAHgJAAgdIAAgpQAAgagIgJQgJgHgYAAg");
	this.shape_40.setTransform(-604.075,234.2);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#F79021").s().p("AhID8QghgOgUgaQgTgbgEgfQgEggAAhOIAAhWQAAhNAEggQAEggASgaQAUgaAfgOQAhgPAqAAQAoAAAiAOQAgANATAbQAUAaAEAgQAEAfAABPIAABWQAABMgEAgQgDAggUAaQgTAbgfAOQghAOgrAAQgoAAgggNgAgOipQgGAHAAAoIAADsQAAAsAEALQADAKANAAQANAAAEgMQAEgMAAgtIAAjoQAAgkgEgJQgEgLgNAAQgJAAgFAJg");
	this.shape_41.setTransform(-642.7,234.175);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#F79021").s().p("AhBD+IAAmVIhOAAIAAhmIEfAAIAABmIhOAAIAAGVg");
	this.shape_42.setTransform(-679.225,234.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#F79021").s().p("AhmGJIAAp0Ih4AAIAAidIG9AAIAACdIh5AAIAAJ0g");
	this.shape_43.setTransform(189.2,-219.675);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#F79021").s().p("AAxGJIhpllIAAFlIirAAIAAsRICrAAIBxFiIAAliICrAAIAAMRg");
	this.shape_44.setTransform(133,-219.675);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#F79021").s().p("AiwGJIAAsRIFUAAIAACdIiJAAIAACVICAAAIAACVIiAAAIAACtICWAAIAACdg");
	this.shape_45.setTransform(80.2,-219.675);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#F79021").s().p("AjsGJIAAsRICZAAQCTAAA1AOQAzANAbAfQAcAfAGAnQAIAmAABvIAAESQAABqgKAkQgKAjgZAVQgZAUglAIQgkAIhJAAgAgfECQAqAAALgRQAKgSAAhPIAAkwQAAg1gDgPQgEgPgMgHQgMgHggAAg");
	this.shape_46.setTransform(24.85,-219.675);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#F79021").s().p("Ah0F6Qg2gYgbglQgagmgFgpQgEgqgBiEIAAnQIDNAAIAAJMQAAAzAFAPQAGAOARAAQASAAAGgPQAGgRgBg6IAApCIDNAAIAAIMQgBBZgFAlQgGAjgdAnQgdAmguATQgvAUg/AAQhGAAg2gXg");
	this.shape_47.setTransform(-36.5,-218.85);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#F79021").s().p("AhlGJIAAp0Ih5AAIAAidIG9AAIAACdIh5AAIAAJ0g");
	this.shape_48.setTransform(-93,-219.675);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#F79021").s().p("AiEF6Qg6gfgSgwQgSgwAAhYIAAg0IC+AAIAABgQAAAsAIANQAIAMAUAAQATAAALgQQAJgQAAgfQAAhGgTgVQgTgVhLgyQhMgzgZgWQgZgWgQgpQgQgoAAg/QAAhaAXgqQAXgpAzgYQAzgXBJAAQBPAAA4AZQA4AaASAnQASAnAABeIAAAfIi9AAIAAg6QAAgpgIgLQgHgLgQAAQgSAAgKAPQgJAPAAAeQAAAoAKATQALAUAuAdQCIBRAkAyQAjA0AAB0QAABUgTAoQgUAng4AcQg5AahKAAQhRAAg6gfg");
	this.shape_49.setTransform(-147.975,-219.675);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#F79021").s().p("AhlGJIAAp0Ih5AAIAAidIG9AAIAACdIh5AAIAAJ0g");
	this.shape_50.setTransform(-227,-219.675);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#F79021").s().p("AiEF6Qg6gfgSgwQgSgwAAhYIAAg0IC+AAIAABgQAAAsAIANQAIAMAUAAQATAAALgQQAJgQAAgfQAAhGgTgVQgTgVhLgyQhMgzgZgWQgZgWgQgpQgQgoAAg/QAAhaAXgqQAXgpAzgYQAzgXBJAAQBPAAA4AZQA4AaASAnQASAnAABeIAAAfIi9AAIAAg6QAAgpgIgLQgHgLgQAAQgSAAgKAPQgJAPAAAeQAAAoAKATQALAUAuAdQCIBRAkAyQAjA0AAB0QAABUgTAoQgUAng4AcQg5AahKAAQhRAAg6gfg");
	this.shape_51.setTransform(-281.975,-219.675);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#F79021").s().p("AiwGJIAAsRIFUAAIAACdIiJAAIAACVICAAAIAACVIiAAAIAACtICWAAIAACdg");
	this.shape_52.setTransform(-333.55,-219.675);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#F79021").s().p("AjtGJIAAsRIDMAAQBfAAAyAPQAyAPAeAuQAfAuAABmQAABFgVAbQgWAbhAAPQBHAQAZAkQAaAlAABNIAABIQAABQgSAmQgTAngoAOQgnAOh7AAgAghECQAqgBANgMQALgMAAgwIAAhJQAAgzgKgKQgLgLgtgBgAghhTIAVAAQAdAAAIgPQAIgPAAhGQAAglgHgOQgGgPgLgEQgKgEggAAg");
	this.shape_53.setTransform(-388.775,-219.675);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#F79021").s().p("Ah/F2Qg6gbgYg0QgYg0gBhuIAAgrIDFAAIAAAxQAABMAFAgQAFAgAfAAQAPAAAIgJQAJgJABgLIABhcIAAicQAAgrgJgQQgIgQgVAAQgNAAgKAIQgJAIgDAKQgCAJAAAjIjDAAIAImMIGkAAIAAB9IjyAAIAACGQAug2BGAAQBSAAAqAuQApAtgBCAIAABwQAABTgHAoQgJAmgZAiQgaAhgwASQgvARhDAAQhKAAg6gag");
	this.shape_54.setTransform(-473.7,-218.925);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#F79021").s().p("AjbGJIAAsRIDNAAQBTAAAtANQAsANAXAZQAXAZAIAjQAIAjAABKIAABEQAABMgPAhQgQAjgqASQgpAShDAAIg2AAIAAE9gAgPg6IAPABQAbAAALgOQALgOAAgrIAAhBQAAgogNgMQgMgMgnAAg");
	this.shape_55.setTransform(-554.45,-219.675);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#F79021").s().p("AhwGFQgzgVgegpQgfgpgFgxQgGgxAAh5IAAiFQAAh3AGgxQAFgxAdgpQAegpAygVQAygWBBAAQA/AAAzAVQAyAUAeApQAfApAFAxQAGAwAAB6IAACFQAAB3gFAxQgGAxgdApQgeApgyAVQgyAWhCAAQg+AAgygUgAgWkHQgJAMAAA9IAAFuQAABEAGAQQAFAQAUAAQAUAAAGgSQAGgTAAhFIAAloQAAg3gGgPQgGgPgTAAQgPAAgIAMg");
	this.shape_56.setTransform(-614.175,-219.675);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#F79021").s().p("AhmGJIAAp0Ih4AAIAAidIG9AAIAACdIh5AAIAAJ0g");
	this.shape_57.setTransform(-670.65,-219.675);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#F79021").s().p("Ag8D2IAAiyIhak5IB2AAQAbCQADAyQALhPAYhzIB2AAIhdE5IAACyg");
	this.shape_58.setTransform(446.3,78.025);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#F79021").s().p("Ag/D2IAAmJIhMAAIAAhiIEXAAIAABiIhMAAIAAGJg");
	this.shape_59.setTransform(411.6,78.025);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#F79021").s().p("Ag/D2IAAnrIB/AAIAAHrg");
	this.shape_60.setTransform(384.2,78.025);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#F79021").s().p("AhSDtQglgTgLgeQgLgfAAg3IAAggIB3AAIAAA8QAAAbAFAIQAFAIAMAAQAMAAAHgKQAGgKAAgUQAAgrgMgOQgMgNgvgfQgwgggPgNQgQgOgKgaQgKgZAAgnQAAg5AOgaQAPgaAggPQAggPAuAAQAxAAAjAQQAjARALAYQAMAZAAA6IAAAUIh3AAIAAglQAAgZgFgHQgEgHgKAAQgMAAgFAJQgGAKAAATQAAAYAGANQAHAMAcASQBWAzAWAfQAWAhAABIQAAA1gMAZQgMAZgkARQgjARgvAAQgyAAgkgUg");
	this.shape_61.setTransform(355.175,78.025);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#F79021").s().p("AAYD2IAAijQAAgogGgJQgHgKgZAAIAADeIiAAAIAAnrIBaAAQBbAAAgAHQAfAHAVAdQAUAcAAA/QAAA6gPATQgOAUgqAEQAnAKANAOQANAQADAOQADANAAA7IAACCgAgOg0QAVAAAJgFQAIgGAAghIAAgbQAAgXgIgIQgIgHgWAAg");
	this.shape_62.setTransform(318.3,78.025);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#F79021").s().p("AhuD2IAAnrIDVAAIAABiIhWAAIAABeIBQAAIAABcIhQAAIAABtIBeAAIAABig");
	this.shape_63.setTransform(285.2,78.025);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#F79021").s().p("AhcD2IhKnrICHAAQAYDLAJCMQAKiNALhvIAJhbICHAAIhBHrg");
	this.shape_64.setTransform(251.225,78.025);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#F79021").s().p("Ag/D2IAAnrIB/AAIAAHrg");
	this.shape_65.setTransform(221.9,78.025);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#F79021").s().p("AAfD2IhCjgIAADgIhrAAIAAnrIBrAAIBHDdIAAjdIBrAAIAAHrg");
	this.shape_66.setTransform(192.1,78.025);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#F79021").s().p("AhIDtQgigPgQgYQgRgWgDgaQgDgbgBhTIAAkjICBAAIAAFxQAAAgAEAJQADAJAKAAQAMAAADgKQADgKAAgkIAAlrICBAAIAAFJQAAA3gEAYQgEAWgRAYQgTAXgcANQgeAMgoAAQgrABgigPg");
	this.shape_67.setTransform(154.15,78.55);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#F79021").s().p("AAfD2IgHhYIgtAAIgHBYIiFAAIBBnrIC5AAIBJHrgAgWBGIAqAAQgJhSgKh7QgTCMgEBBg");
	this.shape_68.setTransform(102.3,78.025);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#F79021").s().p("Ag/D2IAAnrIB/AAIAAHrg");
	this.shape_69.setTransform(73.45,78.025);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#F79021").s().p("AiTD2IAAnrIBgAAQBbAAAhAIQAhAJARATQARAUAEAYQAEAXAABGIAACsQAABCgGAXQgGAWgQANQgPAMgXAFQgXAFguAAgAgTCiQAbAAAGgLQAGgLAAgyIAAi+QAAghgCgKQgCgJgIgEQgHgFgUAAg");
	this.shape_70.setTransform(43.425,78.025);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#F79021").s().p("AhuD2IAAnrIDVAAIAABiIhWAAIAABeIBQAAIAABcIhQAAIAABtIBeAAIAABig");
	this.shape_71.setTransform(9.8,78.025);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#F79021").s().p("ABWD2IAAlLIgtFLIhPAAIgulEIgBFEIhwAAIAAnrICmAAIAPBoIASB+IAdjmICnAAIAAHrg");
	this.shape_72.setTransform(-30.175,78.025);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#F79021").s().p("Ag/D2IAAnrIB/AAIAAHrg");
	this.shape_73.setTransform(-65.5,78.025);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#F79021").s().p("Ag/D2IAAmJIhMAAIAAhiIEXAAIAABiIhMAAIAAGJg");
	this.shape_74.setTransform(-92.85,78.025);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#F79021").s().p("AhmD2IAAnrIB/AAIAAGJIBOAAIAABig");
	this.shape_75.setTransform(-117.65,78.025);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#F79021").s().p("AhIDtQghgPgSgYQgQgWgDgaQgEgbABhTIAAkjICAAAIAAFxQAAAgADAJQAEAJAKAAQALAAAFgKQACgKAAgkIAAlrICAAAIAAFJQABA3gEAYQgEAWgRAYQgTAXgdANQgdAMgoAAQgrABgigPg");
	this.shape_76.setTransform(-151.6,78.55);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#F79021").s().p("ABWD2IAAlLIgtFLIhPAAIgulEIgBFEIhwAAIAAnrICmAAIAPBoIASB+IAdjmICnAAIAAHrg");
	this.shape_77.setTransform(-194.875,78.025);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#F79021").s().p("Ag8D2IAAiyIhak5IB2AAQAbCQADAyQAKhPAZhzIB2AAIheE5IAACyg");
	this.shape_78.setTransform(-251,78.025);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#F79021").s().p("AiUD2IAAnrICAAAQA7AAAfAJQAgAKATAcQATAdAABAQAAArgOARQgNARgoAJQAsAKAQAXQAQAXAAAwIAAAuQAAAygLAYQgLAYgZAIQgZAJhNAAgAgUCiQAagBAIgIQAHgHAAgeIAAguQAAgggHgGQgHgHgbgBgAgUg0IANAAQASAAAFgJQAFgJAAgsQAAgXgEgJQgFgKgGgCQgGgDgUAAg");
	this.shape_79.setTransform(-286.75,78.025);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#F79021").s().p("AAfD2IhCjgIAADgIhrAAIAAnrIBrAAIBHDdIAAjdIBrAAIAAHrg");
	this.shape_80.setTransform(-340.1,78.025);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#F79021").s().p("AhGD0QgggNgTgaQgTgagDgeQgEgfAAhMIAAhTQAAhKAEgfQADgfASgaQATgZAfgOQAggOAoAAQAoAAAgANQAfANATAaQATAaADAeQAEAfAABMIAABTQAABKgDAfQgEAfgSAaQgSAZggAOQgfAOgqAAQgmAAgggNgAgOikQgFAHAAAmIAADlQAAArADAKQAEAKAMAAQANAAAEgLQADgMAAgrIAAjiQAAgigDgKQgEgJgNAAQgIAAgGAIg");
	this.shape_81.setTransform(-378.05,78.025);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#F79021").s().p("Ag/D2IAAnrIB/AAIAAHrg");
	this.shape_82.setTransform(-408.05,78.025);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#F79021").s().p("Ag/D2IAAmJIhMAAIAAhiIEXAAIAABiIhMAAIAAGJg");
	this.shape_83.setTransform(-435.4,78.025);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#F79021").s().p("Ag/D2IAAnrIB/AAIAAHrg");
	this.shape_84.setTransform(-462.8,78.025);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#F79021").s().p("Ag/D2IAAmJIhMAAIAAhiIEXAAIAABiIhMAAIAAGJg");
	this.shape_85.setTransform(-490.15,78.025);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#F79021").s().p("AhuD2IAAnrIDVAAIAABiIhWAAIAABeIBQAAIAABcIhQAAIAABtIBeAAIAABig");
	this.shape_86.setTransform(-519.95,78.025);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#F79021").s().p("AiJD2IAAnrICBAAQAzAAAdAIQAcAIAOAQQAOAPAFAWQAFAWAAAvIAAAqQAAAwgJAUQgLAWgZALQgbAMgqAAIghAAIAADGgAgJgkIAJABQARAAAHgJQAHgJAAgbIAAgpQAAgZgIgHQgIgIgYAAg");
	this.shape_87.setTransform(-552.5,78.025);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#F79021").s().p("ABWD2IAAlLIgtFLIhPAAIgulEIgBFEIhwAAIAAnrICmAAIAPBoIASB+IAdjmICnAAIAAHrg");
	this.shape_88.setTransform(-595.175,78.025);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#F79021").s().p("AhGD0QgggNgTgaQgTgagDgeQgEgfAAhMIAAhTQAAhKAEgfQADgfASgaQATgZAfgOQAggOAoAAQAoAAAgANQAfANATAaQATAaADAeQAEAfAABMIAABTQAABKgDAfQgEAfgSAaQgSAZggAOQgfAOgqAAQgmAAgggNgAgOikQgFAHAAAmIAADlQAAArADAKQAEAKAMAAQANAAAEgLQADgMAAgrIAAjiQAAgigDgKQgFgJgMAAQgIAAgGAIg");
	this.shape_89.setTransform(-638.6,78.025);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#F79021").s().p("AhaDsQglgUgLgkQgMgkAAhJIAAiPQAAg1ADgaQAEgbASgZQASgYAggOQAggPAqAAQA4AAAkAWQAlAWAMAhQALAhAABEIAAAvIiAAAIAAhVQAAgmgEgJQgEgJgOAAQgPAAgEALQgEALAAAmIAADjQAAAkAEALQAEALAOAAQAOAAAFgLQAEgLAAgoIAAg+ICAAAIAAATQAABMgKAhQgLAgglAYQglAYg2AAQg4AAgkgVg");
	this.shape_90.setTransform(-676.825,78.025);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#F79021").s().p("AhTDxQgcgQgPgXQgPgXgDgZQgEgaAAgzIAAiRQAAhHAIgfQAHggAlgbQAjgbA6AAQA3AAAlAXQAlAYALAgQAMAfAAA9IAAAVIiAAAIAAgtQAAgqgEgLQgEgKgNAAQgLAAgFAJQgEAJAAAmIAADrQAAAhAEALQAFAKAMAAQAOAAAFgMQAFgLAAgjIAAg6IgZAAIAAhKICVAAIAAEHIhRAAIgLgjQgOAXgUALQgUAMgaAAQggAAgcgQg");
	this.shape_91.setTransform(70.775,-0.025);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#F79021").s().p("AAfD2IhCjgIAADgIhrAAIAAnrIBrAAIBHDdIAAjdIBrAAIAAHrg");
	this.shape_92.setTransform(32.85,-0.025);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#F79021").s().p("Ag/D2IAAnrIB/AAIAAHrg");
	this.shape_93.setTransform(3,-0.025);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#F79021").s().p("AAYD2IAAijQAAgogGgJQgGgKgaAAIAADeIiAAAIAAnrIBaAAQBaAAAhAHQAfAHAVAdQAUAcAAA/QAAA6gPATQgOAUgpAEQAmAKANAOQANAQADAOQADANAAA7IAACCgAgOg0QAUAAAKgFQAIgGAAghIAAgbQAAgXgIgIQgJgHgVAAg");
	this.shape_94.setTransform(-26.7,-0.025);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#F79021").s().p("AhuD2IAAnrIDUAAIAABiIhVAAIAABeIBQAAIAABcIhQAAIAABtIBeAAIAABig");
	this.shape_95.setTransform(-59.8,-0.025);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#F79021").s().p("AiTD2IAAnrIBgAAQBbAAAhAIQAhAJARATQARAUAEAYQAEAXAABGIAACsQAABCgGAXQgGAWgQANQgPAMgXAFQgXAFguAAgAgTCiQAbAAAGgLQAGgLAAgyIAAi+QAAghgCgKQgCgJgIgEQgHgFgUAAg");
	this.shape_96.setTransform(-94.525,-0.025);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#F79021").s().p("AAfD2IhCjgIAADgIhrAAIAAnrIBrAAIBHDdIAAjdIBrAAIAAHrg");
	this.shape_97.setTransform(-132.8,-0.025);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#F79021").s().p("AhuD2IAAnrIDVAAIAABiIhWAAIAABeIBQAAIAABcIhQAAIAABtIBeAAIAABig");
	this.shape_98.setTransform(-165.9,-0.025);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#F79021").s().p("AAYD2IAAijQAAgogGgJQgGgKgaAAIAADeIiAAAIAAnrIBbAAQBZAAAgAHQAhAHAUAdQAUAcAAA/QAAA6gOATQgOAUgqAEQAlAKANAOQANAQAEAOQADANAAA7IAACCgAgOg0QAVAAAIgFQAJgGAAghIAAgbQAAgXgIgIQgJgHgVAAg");
	this.shape_99.setTransform(-200.25,-0.025);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#F79021").s().p("AiTD2IAAnrIBgAAQBbAAAhAIQAhAJARATQARAUAEAYQAEAXAABGIAACsQAABCgGAXQgGAWgQANQgPAMgXAFQgXAFguAAgAgTCiQAbAAAGgLQAGgLAAgyIAAi+QAAghgCgKQgCgJgIgEQgHgFgUAAg");
	this.shape_100.setTransform(-253.225,-0.025);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#F79021").s().p("AhaDtQghgUgKgcQgLgdAAhGIAAgnIB7AAIAABQQAAAgAEAJQAEAIANAAQANAAAEgLQAFgLAAguIAAgiQAAgcgGgOQgHgNgLgEQgNgDgkgBIAAhHQAsAAAKgDQAKgDAEgMQAFgLAAgYIAAgbQAAgbgFgHQgGgJgLAAQgMABgEAIQgFAIAAAdIAAApIh7AAIAAgqQAAhHAggZQAhgZBGAAQBXAAAfAiQAfAjAAA9QAAAqgLASQgLASgcAPQAcAKANAVQAOAVAABPQAAA7gNAgQgOAhghAQQghARgzAAQg5AAgigTg");
	this.shape_101.setTransform(-291.275,-0.05);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#F79021").s().p("AAfD2IhCjgIAADgIhrAAIAAnrIBrAAIBHDdIAAjdIBrAAIAAHrg");
	this.shape_102.setTransform(-343.5,-0.025);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#F79021").s().p("Ag/D2IAAnrIB/AAIAAHrg");
	this.shape_103.setTransform(-373.4,-0.025);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#F79021").s().p("AhuD2IAAnrIDUAAIAABiIhVAAIAABeIBQAAIAABcIhQAAIAABtIBeAAIAABig");
	this.shape_104.setTransform(-413.6,-0.025);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#F79021").s().p("AhaDsQglgUgLgkQgMgkAAhJIAAiPQAAg1ADgaQAEgbASgZQASgYAggOQAggPAqAAQA4AAAkAWQAlAWAMAhQALAhAABEIAAAvIiAAAIAAhVQAAgmgEgJQgEgJgOAAQgPAAgEALQgEALAAAmIAADjQAAAkAEALQAEALAOAAQAOAAAFgLQAEgLAAgoIAAg+ICAAAIAAATQAABMgKAhQgLAgglAYQglAYg2AAQg4AAgkgVg");
	this.shape_105.setTransform(-448.475,-0.025);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#F79021").s().p("AAeD2IgGhYIgtAAIgHBYIiFAAIBBnrIC5AAIBJHrgAgXBGIArAAQgJhSgKh7QgSCMgGBBg");
	this.shape_106.setTransform(-485.6,-0.025);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#F79021").s().p("AhmD2IAAnrIB/AAIAAGJIBOAAIAABig");
	this.shape_107.setTransform(-517.9,-0.025);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#F79021").s().p("AiJD2IAAnrICBAAQA0AAAcAIQAcAIAOAQQAOAPAFAWQAFAWAAAvIAAAqQAAAwgKAUQgKAWgaALQgZAMgrAAIghAAIAADGgAgJgkIAJABQARAAAHgJQAHgJAAgbIAAgpQAAgZgIgHQgIgIgYAAg");
	this.shape_108.setTransform(-549.7,-0.025);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#F79021").s().p("AiTD2IAAnrIBgAAQBbAAAhAIQAhAJARATQARAUAEAYQAEAXAABGIAACsQAABCgGAXQgGAWgQANQgPAMgXAFQgXAFguAAgAgTCiQAbAAAGgLQAGgLAAgyIAAi+QAAghgCgKQgCgJgIgEQgHgFgUAAg");
	this.shape_109.setTransform(-602.125,-0.025);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#F79021").s().p("AAYD2IAAijQAAgogGgJQgGgKgaAAIAADeIiAAAIAAnrIBbAAQBaAAAfAHQAgAHAVAdQAUAcAAA/QAAA6gOATQgOAUgqAEQAlAKANAOQANAQAEAOQADANAAA7IAACCgAgOg0QAVAAAIgFQAJgGAAghIAAgbQAAgXgIgIQgJgHgVAAg");
	this.shape_110.setTransform(-640.25,-0.025);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#F79021").s().p("AhaDtQghgUgKgcQgLgdAAhGIAAgnIB7AAIAABQQAAAgAEAJQAEAIANAAQANAAAEgLQAFgLAAguIAAgiQAAgcgGgOQgHgNgLgEQgNgDgkgBIAAhHQAsAAAKgDQAKgDAEgMQAFgLAAgYIAAgbQAAgbgFgHQgGgJgLAAQgMABgEAIQgFAIAAAdIAAApIh7AAIAAgqQAAhHAggZQAhgZBGAAQBXAAAfAiQAfAjAAA9QAAAqgLASQgLASgcAPQAcAKANAVQAOAVAABPQAAA7gNAgQgOAhghAQQghARgzAAQg5AAgigTg");
	this.shape_111.setTransform(-677.825,-0.05);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#F79021").s().p("AA4G/Ih4mWIAAGWIjCAAIAAt9IDCAAICBGSIAAmSIDCAAIAAN9g");
	this.shape_112.setTransform(592.65,-347.35);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#F79021").s().p("Ah/G6Qg6gYgjgvQgigvgHg3QgHg3AAiKIAAiYQAAiGAHg4QAGg4AiguQAhgvA5gZQA4gYBLAAQBIAAA5AXQA5AYAjAuQAiAvAHA3QAHA4AACJIAACYQAACHgGA4QgHA4ghAuQgiAug5AZQg4AZhMAAQhHAAg4gXgAgZkrQgKAOAABFIAAGgQAABNAGATQAGASAXAAQAXAAAHgVQAGgVAAhPIAAmZQAAg/gGgRQgHgRgWAAQgRAAgJAOg");
	this.shape_113.setTransform(523.875,-347.325);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#F79021").s().p("AhzG/IAAt9IDnAAIAAN9g");
	this.shape_114.setTransform(469.5,-347.35);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#F79021").s().p("AhzG/IAArKIiKAAIAAizIH7AAIAACzIiKAAIAALKg");
	this.shape_115.setTransform(419.875,-347.35);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#F79021").s().p("AA4G/IgMihIhTAAIgNChIjwAAIB2t9IFPAAICEN9gAgpB/IBPAAQgSiWgSjfQgjD/gIB2g");
	this.shape_116.setTransform(364.075,-347.35);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#F79021").s().p("ACcG/IAApaIhSJaIiOAAIhWpNIAAJNIjLAAIAAt9IEsAAQAOBRAOBuIAgDjIA1miIEuAAIAAN9g");
	this.shape_117.setTransform(287.65,-347.35);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#F79021").s().p("AhzG/IAAt9IDnAAIAAN9g");
	this.shape_118.setTransform(223.65,-347.35);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#F79021").s().p("AA4G/Ih4mWIAAGWIjCAAIAAt9IDCAAICBGSIAAmSIDCAAIAAN9g");
	this.shape_119.setTransform(169.55,-347.35);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#F79021").s().p("AA4G/IgMihIhTAAIgNChIjwAAIB2t9IFPAAICEN9gAgpB/IBPAAQgSiWgSjfQgjD/gIB2g");
	this.shape_120.setTransform(103.025,-347.35);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#F79021").s().p("AkMG/IAAt9ICuAAQCnABA8APQA7AQAeAjQAfAjAIAsQAIArAAB+IAAE4QAAB5gLAoQgMAogcAXQgcAYgpAJQgqAIhTABgAgkEmQAxgBAMgTQAMgVAAhZIAAlaQAAg9gEgRQgEgQgOgJQgOgHglgBg");
	this.shape_121.setTransform(8.925,-347.35);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#F79021").s().p("Aj+HHIAAiAQDZliAphVQAphVAAgwQAAgkgNgSQgMgSgYAAQgaABgMATQgNAUAAA7IAABVIjHAAIAAghQAAhKAHgsQAIgrAegqQAfgqAwgWQAxgVBEAAQCEAABEBCQBEBCAABlQAABNgmBVQgnBVi7EVID0AAIAACYg");
	this.shape_122.setTransform(-58.05,-348.2);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#F79021").s().p("AA4G/Ih4mWIAAGWIjCAAIAAt9IDCAAICBGSIAAmSIDCAAIAAN9g");
	this.shape_123.setTransform(-151.65,-347.35);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#F79021").s().p("AhzG/IAAt9IDnAAIAAN9g");
	this.shape_124.setTransform(-205.75,-347.35);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#F79021").s().p("AA4G/IgMihIhTAAIgNChIjwAAIB2t9IFPAAICEN9gAgpB/IBPAAQgSiWgSjfQgjD/gIB2g");
	this.shape_125.setTransform(-285.175,-347.35);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#F79021").s().p("ACbG/IAApaIhRJaIiPAAIhUpNIgBJNIjLAAIAAt9IEsAAQANBRAPBuIAgDjIA1miIEuAAIAAN9g");
	this.shape_126.setTransform(-361.6,-347.35);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#F79021").s().p("Ah/G6Qg6gYgjgvQgigvgHg3QgHg3AAiKIAAiYQAAiGAHg4QAGg4AiguQAhgvA5gZQA4gYBLAAQBIAAA5AXQA5AYAjAuQAiAvAHA3QAHA4AACJIAACYQAACHgGA4QgHA4ghAuQgiAug5AZQg4AZhMAAQhHAAg4gXgAgZkrQgKAOAABFIAAGgQAABNAGATQAGASAXAAQAXAAAHgVQAGgVAAhPIAAmZQAAg/gGgRQgHgRgWAAQgRAAgJAOg");
	this.shape_127.setTransform(-440.275,-347.325);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#F79021").s().p("Ai5G/IAAt9IDnAAIAALKICMAAIAACzg");
	this.shape_128.setTransform(-496.35,-347.35);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#F79021").s().p("Aj5G/IAAt9IDqAAQBeAAAzAPQAzAPAZAdQAaAbAJApQAJAoAABTIAABOQAABWgSAmQgSAnguAVQgwAVhMAAIg9AAIAAFogAgRhBIARAAQAfAAANgQQAMgPAAgyIAAhJQAAgugPgOQgOgOgsAAg");
	this.shape_129.setTransform(-553.95,-347.35);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#F79021").s().p("AhzG/IAAt9IDnAAIAAN9g");
	this.shape_130.setTransform(-607.15,-347.35);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#F79021").s().p("AkMG/IAAt9ICuAAQCnABA8APQA7AQAeAjQAfAjAIAsQAIArAAB+IAAE4QAAB5gLAoQgMAogcAXQgcAYgpAJQgqAIhTABgAgkEmQAxgBAMgTQAMgVAAhZIAAlaQAAg9gEgRQgEgQgOgJQgOgHglgBg");
	this.shape_131.setTransform(-661.575,-347.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-696.7,-420.3,1331.2,776.1);


(lib.Tween7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.KRUACADEMYLOGO();
	this.instance.setTransform(-257.55,-129.05,1.1126,1.1126);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-257.5,-129,515.1,258.1);


(lib.Tween6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFE3B7").s().p("EiZ9A1uMAAAhrbMEz7AAAMAAABrbg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-985.4,-343.7,1970.8,687.5);


(lib.Tween5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#999999").s().p("AgpB+IArjOIg9AAIAAgtIB3AAIAAA3IgpDEg");
	this.shape.setTransform(111.4,141.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AgqB6QgRgIgIgQQgIgPAAgYIA/AAIABAWQABAFADADQADADAFAAQAFAAADgDQADgDAAgFIAAgSIAAgpQgEALgJAFQgIAFgOAAQgSAAgNgKQgNgJgDgNQgFgMAAgWIAAgUQABgbACgNQACgNAJgKQAIgLAPgGQAQgHAUAAQAZAAAQAHQAQAHAJAOQAIANACAOQABAPABApIAAAiQgBAtgBAPQgBAPgJAOQgKANgQAHQgRAHgVAAQgaAAgQgJgAgHhXQgEAEgBARIAAAwQAAAPAFADQAEAEADAAQAGAAAEgEQACgFAAgNIAAguQAAgRgCgFQgDgFgHAAQgDAAgEAEg");
	this.shape_1.setTransform(94.6,141.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("AgqB6QgSgIgHgQQgIgPAAgYIA/AAIABAWQABAFADADQADADAFAAQAEAAAEgDQADgDAAgFIAAgSIAAgpQgEALgIAFQgKAFgNAAQgSAAgNgKQgNgJgDgNQgFgMAAgWIAAgUQAAgbADgNQACgNAJgKQAIgLAPgGQAQgHAUAAQAZAAAPAHQARAHAJAOQAIANACAOQACAPgBApIAAAiQABAtgCAPQgBAPgJAOQgKANgQAHQgRAHgVAAQgaAAgQgJgAgHhXQgFAEAAARIAAAwQAAAPAFADQAEAEADAAQAHAAADgEQACgFAAgNIAAguQABgRgDgFQgDgFgHAAQgDAAgEAEg");
	this.shape_2.setTransform(75.35,141.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#999999").s().p("AgJB+IAAiGQAAgdgBgGQgCgGgGgDQgGgDgWAAIgGAAIAAgdQAtgKAXgfIAlAAIAAD7g");
	this.shape_3.setTransform(58.05,141.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#999999").s().p("AAMB+IAAhUQAAgUgDgFQgDgFgNAAIAAByIhBAAIAAj7IAuAAQAuAAAQAEQARADAKAPQAKAPAAAgQAAAdgIAKQgHAKgVADQATAEAHAHQAHAIABAHQACAHAAAeIAABDgAgHgaQALAAAEgDQAFgDgBgQIAAgOQABgMgFgEQgEgEgLAAg");
	this.shape_4.setTransform(34.25,141.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#999999").s().p("Ag4B+IAAj7IBsAAIAAAzIgrAAIAAAvIApAAIAAAvIgpAAIAAA3IAwAAIAAAzg");
	this.shape_5.setTransform(17.375,141.725);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#999999").s().p("AhLB+IAAj7IBBAAQAeAAAQAFQAQAFAKAPQAJAOAAAhQAAAWgGAJQgHAIgVAFQAXAFAIALQAIAMAAAYIAAAYQAAAZgGAMQgGANgMAEQgNAFgnAAgAgKBTQANgBAEgEQAEgEAAgPIAAgXQAAgQgEgEQgDgDgOgBgAgKgaIAHAAQAIAAADgFQADgEAAgXQAAgMgDgEQgCgFgDgBQgDgCgKAAg");
	this.shape_6.setTransform(-0.275,141.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#999999").s().p("AAsB+IAAipIgXCpIgnAAIgZilIAAClIg5AAIAAj7IBUAAIAJA2IAIBAIAPh2IBVAAIAAD7g");
	this.shape_7.setTransform(-22.65,141.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#999999").s().p("Ag4B+IAAj7IBsAAIAAAzIgrAAIAAAvIApAAIAAAvIgpAAIAAA3IAwAAIAAAzg");
	this.shape_8.setTransform(-42.325,141.725);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#999999").s().p("AggB+IAAjIIgnAAIAAgzICOAAIAAAzIgmAAIAADIg");
	this.shape_9.setTransform(-58.7,141.725);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#999999").s().p("AhFB+IAAj7IBCAAQAZAAAOAEQAPAFAHAIQAIAIACALQADALgBAYIAAAWQAAAYgEAKQgGALgMAGQgOAFgVAAIgRAAIAABmgAgEgSIAEAAQAJAAAEgEQACgEAAgOIAAgVQAAgNgDgEQgFgEgLAAg");
	this.shape_10.setTransform(-75.7,141.725);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#999999").s().p("Ag4B+IAAj7IBsAAIAAAzIgrAAIAAAvIApAAIAAAvIgpAAIAAA3IAwAAIAAAzg");
	this.shape_11.setTransform(-92.325,141.725);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#999999").s().p("AgpB5QgTgKgGgQQgGgPAAgcIAAgRIA9AAIAAAfQAAAOADAEQACAEAGAAQAGAAAEgFQADgFAAgKQAAgWgGgHQgHgHgXgQQgYgQgIgGQgIgIgFgNQgGgNAAgTQAAgdAIgOQAHgNARgHQAQgIAXAAQAZAAASAIQASAIAGANQAFAMAAAeIAAAKIg8AAIAAgSQAAgNgDgEQgCgEgEABQgGgBgDAFQgDAFAAAKQAAAMADAHQADAGAOAJQAsAaALAPQAMARAAAlQAAAbgGANQgHAMgSAJQgSAJgYAAQgZAAgSgKg");
	this.shape_12.setTransform(-109.575,141.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#999999").s().p("AgoB4QgTgJgIgRQgHgQAAgkIAAgNIA+AAIAAAQQAAAYACAKQACAKAJAAQAFAAADgDQACgDAAgDIABgeIAAgxQAAgOgDgFQgDgFgGAAQgEAAgDADQgDACAAAEQgCADAAALIg9AAIACh/ICGAAIAAAoIhNAAIAAArQAOgSAWAAQAbAAANAPQANAPAAAoIAAAkQAAAagCANQgDAMgIALQgJALgPAFQgPAGgWAAQgXAAgSgIg");
	this.shape_13.setTransform(-136.05,141.975);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#999999").s().p("AhHCAIAAgkQA9hjALgYQAMgYAAgNQAAgKgEgFQgDgFgHAAQgHAAgDAFQgEAGAAAQIAAAYIg4AAIAAgJQAAgVACgMQACgMAJgMQAJgMANgGQAOgGATAAQAkAAAUATQATASAAAdQAAAVgLAYQgLAXg0BOIBEAAIAAArg");
	this.shape_14.setTransform(-154.575,141.475);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#999999").s().p("AAPB+IgDgtIgXAAIgDAtIhEAAIAhj7IBeAAIAmD7gAgLAkIAWAAQgGgqgEg/QgKBIgCAhg");
	this.shape_15.setTransform(251.65,100.825);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#999999").s().p("AggB+IAAj7IBBAAIAAD7g");
	this.shape_16.setTransform(236.925,100.825);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#999999").s().p("AgpB5QgTgKgGgPQgGgQAAgcIAAgQIA9AAIAAAeQAAAOADAEQACAEAGAAQAGAAAEgFQADgFAAgKQAAgXgGgGQgHgHgXgQQgYgQgIgHQgIgHgFgNQgGgMAAgVQAAgdAIgNQAHgNARgIQAQgHAXAAQAZAAASAIQASAIAGANQAFAMAAAeIAAAKIg8AAIAAgTQAAgNgDgDQgCgDgEgBQgGABgDAEQgDAFAAAJQAAANADAGQADAHAOAJQAsAaALAQQAMAQAAAlQAAAbgGANQgHAMgSAJQgSAJgYAAQgZAAgSgKg");
	this.shape_17.setTransform(222.075,100.85);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#999999").s().p("AgeB+IAAhbIguigIA8AAQAOBKACAZQAEgoANg7IA8AAIgwCgIAABbg");
	this.shape_18.setTransform(204.275,100.825);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#999999").s().p("AAPB+IgDgtIgXAAIgDAtIhEAAIAhj7IBeAAIAmD7gAgLAkIAWAAQgGgqgEg/QgJBIgDAhg");
	this.shape_19.setTransform(188.55,100.825);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#999999").s().p("Ag0B+IAAj7IBBAAIAADIIAoAAIAAAzg");
	this.shape_20.setTransform(172.05,100.825);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#999999").s().p("AAPB+IgDgtIgXAAIgDAtIhEAAIAhj7IBeAAIAmD7gAgLAkIAWAAQgGgqgEg/QgKBIgCAhg");
	this.shape_21.setTransform(155.35,100.825);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#999999").s().p("AAsB+IAAipIgXCpIgnAAIgYilIgBClIg5AAIAAj7IBVAAIAIA2IAIBAIAOh2IBWAAIAAD7g");
	this.shape_22.setTransform(133.85,100.825);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#999999").s().p("AgUAXQAJgGABgIIgKAAIAAgwIApAAIAAAWQAAARgEALQgEALgKAIQgKAIgNADg");
	this.shape_23.setTransform(110.05,112.55);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#999999").s().p("AgkB5QgRgIgJgMQgJgMgBgNQgCgNAAgrIAAiTIBCAAIAAC7QAAAQACAFQABAFAFgBQAGABACgFQACgFAAgTIAAi4IBBAAIAACmQAAAdgCAMQgCALgJAMQgJAMgPAHQgPAGgUAAQgWAAgRgHg");
	this.shape_24.setTransform(96.625,101.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#999999").s().p("AAQB+IghhzIAABzIg3AAIAAj7IA3AAIAkByIAAhyIA2AAIAAD7g");
	this.shape_25.setTransform(77.25,100.825);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#999999").s().p("AAQB+IgEgtIgWAAIgEAtIhDAAIAhj7IBdAAIAlD7gAgLAkIAVAAQgFgqgFg/QgJBIgCAhg");
	this.shape_26.setTransform(58.55,100.825);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#999999").s().p("AgqB7QgOgIgHgMQgIgMgCgMQgCgOAAgaIAAhKQAAgkAEgQQAEgQASgOQATgNAdAAQAcAAASAMQATAMAHAQQAFAQAAAeIAAALIhCAAIAAgWQABgWgCgFQgCgFgHgBQgFABgCAEQgCAFAAATIAAB4QAAAQACAGQACAFAFAAQAHAAADgGQACgGAAgRIAAgfIgMAAIAAgkIBMAAIAACGIgpAAIgGgTQgHAMgKAGQgKAGgNAAQgRAAgOgIg");
	this.shape_27.setTransform(39.55,100.85);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#999999").s().p("AgqB7QgOgIgIgMQgHgMgCgMQgCgOAAgaIAAhKQAAgkAEgQQAEgQATgOQASgNAdAAQAcAAASAMQAUAMAGAQQAFAQAAAeIAAALIhCAAIAAgWQAAgWgBgFQgCgFgHgBQgFABgDAEQgBAFgBATIAAB4QABAQABAGQADAFAFAAQAIAAACgGQADgGAAgRIAAgfIgNAAIAAgkIBMAAIAACGIgpAAIgGgTQgHAMgKAGQgKAGgNAAQgRAAgOgIg");
	this.shape_28.setTransform(19.95,100.85);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#999999").s().p("AAQB+IgihzIAABzIg2AAIAAj7IA2AAIAkByIAAhyIA3AAIAAD7g");
	this.shape_29.setTransform(0.6,100.825);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#999999").s().p("Ag4B+IAAj7IBsAAIAAAzIgrAAIAAAvIApAAIAAAvIgpAAIAAA3IAwAAIAAAzg");
	this.shape_30.setTransform(-16.275,100.825);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#999999").s().p("AANB+IAAhUQgBgUgDgFQgDgFgMAAIAAByIhCAAIAAj7IAuAAQAuAAAQAEQAQADALAPQAKAPAAAgQAAAdgHAKQgHAKgWADQATAEAHAHQAHAIABAHQACAHAAAeIAABDgAgGgaQAJAAAFgDQAEgDABgQIAAgOQgBgMgEgEQgEgEgKAAg");
	this.shape_31.setTransform(-33.85,100.825);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#999999").s().p("Ag4B+IAAj7IBsAAIAAAzIgrAAIAAAvIApAAIAAAvIgpAAIAAA3IAwAAIAAAzg");
	this.shape_32.setTransform(-50.725,100.825);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#999999").s().p("AggB+IAAjIIgnAAIAAgzICPAAIAAAzIgnAAIAADIg");
	this.shape_33.setTransform(-67.1,100.825);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#999999").s().p("AAPB+IgDgtIgXAAIgDAtIhEAAIAhj7IBeAAIAmD7gAgLAkIAWAAQgGgqgEg/QgJBIgDAhg");
	this.shape_34.setTransform(-92.25,100.825);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#999999").s().p("Ag0B+IAAj7IBBAAIAADIIAnAAIAAAzg");
	this.shape_35.setTransform(-108.75,100.825);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#999999").s().p("AAQB+IgEgtIgWAAIgEAtIhEAAIAij7IBdAAIAlD7gAgLAkIAVAAQgEgqgGg/QgIBIgDAhg");
	this.shape_36.setTransform(-125.4,100.825);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#999999").s().p("AgkB5QgRgIgJgMQgJgMgBgNQgCgNAAgrIAAiTIBCAAIAAC7QAAAQACAFQABAFAFgBQAGABACgFQACgFAAgTIAAi4IBBAAIAACmQAAAdgCAMQgCALgJAMQgJAMgPAHQgPAGgUAAQgWAAgRgHg");
	this.shape_37.setTransform(-144.275,101.1);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#999999").s().p("AAMB+IgZhsIAABsIhCAAIAAj7IBCAAIAABiIAchiIA9AAIglByIApCJg");
	this.shape_38.setTransform(-162.775,100.825);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#999999").s().p("AAQB+IghhzIAABzIg3AAIAAj7IA3AAIAjByIAAhyIA3AAIAAD7g");
	this.shape_39.setTransform(-190.4,100.825);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#999999").s().p("AggB+IAAj7IBBAAIAAD7g");
	this.shape_40.setTransform(-205.625,100.825);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#999999").s().p("AAQB+IgihzIAABzIg2AAIAAj7IA2AAIAkByIAAhyIA3AAIAAD7g");
	this.shape_41.setTransform(-228.55,100.825);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#999999").s().p("AAMB+IAAhUQAAgUgDgFQgDgFgMAAIAAByIhCAAIAAj7IAvAAQAsAAARAEQAQADALAPQAKAPAAAgQAAAdgIAKQgHAKgVADQAUAEAGAHQAHAIACAHQABAHAAAeIAABDgAgGgaQAKAAAEgDQAEgDAAgQIAAgOQAAgMgEgEQgEgEgKAAg");
	this.shape_42.setTransform(-247.75,100.825);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#999999").s().p("AgjB9QgQgIgKgMQgKgOgCgQQgCgPAAgnIAAgpQAAgmACgQQACgQAJgNQAKgNAQgIQAQgGAUAAQAUAAAQAGQAQAHAKANQAKAOACAPQACAPAAAoIAAApQAAAmgCAQQgCAPgJAOQgKANgQAHQgQAHgVAAQgTAAgQgGgAgGhTQgDADAAATIAAB1QAAAWACAFQABAFAGAAQAHAAABgGQACgGAAgWIAAhzQAAgRgCgEQgCgGgGAAQgEAAgCAFg");
	this.shape_43.setTransform(-267.125,100.85);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#999999").s().p("AhLB+IAAj7IBBAAQAeAAAQAFQAQAFAKAPQAJAOAAAhQAAAWgGAJQgHAIgVAFQAXAFAIALQAIAMAAAYIAAAYQAAAZgGAMQgGANgMAEQgNAFgnAAgAgKBTQANgBAEgEQAEgEAAgPIAAgXQAAgQgEgEQgDgDgOgBgAgKgaIAHAAQAIAAADgFQADgEAAgXQAAgMgDgEQgCgFgDgBQgDgCgKAAg");
	this.shape_44.setTransform(-286.475,100.825);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#333333").s().p("AgqAvIAAhdIBVAAIAABdg");
	this.shape_45.setTransform(517.975,24.625);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#333333").s().p("AhaC/IAAl2IBxAAIgEAyQAZg2AvgDIAACEQggAAgOAIQgPAJgDAQQgEAOAAA2IAACUg");
	this.shape_46.setTransform(503.375,10.2);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#333333").s().p("Ag8C4QgcgLgPgRQgPgTgGgWQgGgWAAgqIAAhsQAAgyANgbQAOgdAegPQAegQAnAAQAvAAAgATQAfASAMAfQANAdAAA3IAAAwIiTAAIAABRQAAAaAEAHQAEAIAJAAQANAAAFgKQADgJAAgcIAAgyIBtAAIAAAbQAAAjgEATQgFATgQAVQgQAVgZALQgZAKglAAQgjAAgcgKgAgNh4QgDAIAAAfIAAAcIAhAAIAAgcQAAgdgEgJQgCgIgKAAQgLAAgDAHg");
	this.shape_47.setTransform(473.7,10.55);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#333333").s().p("AARC/IAAkDQAAgmgCgJQgDgIgLgBQgLAAgEAKQgDAKAAArIAAD8IhyAAIAAl2IB0AAIgCAiQANgUARgKQASgLAXAAQAeAAASAOQATAOAFAVQAGAVAAAxIAAEGg");
	this.shape_48.setTransform(440.125,10.2);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#333333").s().p("AhgDNQgigTAAg2IBuAAQAAAZASAAQAMAAAEgIQAFgHAAgZIAAgcQgPANgPAHQgQAHgSAAQgfAAgUgMQgUgNgHgUQgHgUAAgmIAAiHQAAg1ASgYQAUgXAnAAQAWAAARAJQARAIAOASIAIgcIBqAAIAAEgQABA6gDARQgDARgQATQgRATgdALQgdAJgrAAQg4AAgggSgAgMiUQgFAIABAYIAAB9QgBAZAEAIQADAHAKAAQAKAAADgJQAEgJAAgfIAAh0QAAgagDgHQgDgHgKAAQgJAAgEAIg");
	this.shape_49.setTransform(406,13.425);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#333333").s().p("Ag6DlIAAl2IB1AAIAAF2gAg6ioIAAg8IB1AAIAAA8g");
	this.shape_50.setTransform(379.475,6.425);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#333333").s().p("AhDC1QgfgOgMgXQgLgXAAgvIAAgSIBlAAIAAAYQAAAeAEAJQAEAJALAAQALAAAFgGQAFgHAAgTQAAgbgHgGQgGgHg7giQgygbgLgXQgLgXAAggQAAgsALgWQAMgVAdgMQAcgMAmAAQAkAAAaAKQAaAJAPAQQANAQADANQADANAAAdIAAAVIhlAAIAAgUQAAgagDgHQgDgHgLAAQgJAAgFAGQgFAHAAAMQAAASADAIQACAIAMAJQALAKAlASQAyAYAQAVQAPAVAAApQAAAvgMAXQgMAXgbANQgcAMgoAAQgqAAgfgNg");
	this.shape_51.setTransform(354.275,10.55);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#333333").s().p("Ag7C4QgdgLgOgRQgQgTgGgWQgGgWAAgqIAAhsQAAgyANgbQANgdAfgPQAegQAoAAQAuAAAgATQAfASAMAfQANAdAAA3IAAAwIiTAAIAABRQAAAaAEAHQAEAIAJAAQANAAAEgKQAFgJAAgcIAAgyIBsAAIAAAbQAAAjgEATQgFATgQAVQgQAVgYALQgZAKgmAAQgjAAgbgKgAgNh4QgDAIAAAfIAAAcIAgAAIAAgcQAAgdgCgJQgDgIgLAAQgKAAgDAHg");
	this.shape_52.setTransform(322,10.55);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#333333").s().p("AiJDlIAAnJIBZAAQBVAAAfAIQAfAIAPASQAQASAEAWQAEAWAABBIAACgQAAA9gGAVQgGAVgOAMQgPALgVAFQgVAFgrAAgAgRCWQAYAAAGgKQAGgKAAguIAAixQAAgfgCgJQgCgIgHgEQgHgFgSAAg");
	this.shape_53.setTransform(287.65,6.425);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#333333").s().p("Ag8C4QgbgLgPgRQgQgTgGgWQgGgWAAgqIAAhsQAAgyANgbQANgdAfgPQAegQAoAAQAvAAAfATQAfASAMAfQANAdAAA3IAAAwIiTAAIAABRQAAAaAEAHQADAIAKAAQANAAAEgKQAEgJABgcIAAgyIBsAAIAAAbQAAAjgEATQgFATgQAVQgQAVgZALQgZAKglAAQgjAAgcgKgAgNh4QgDAIAAAfIAAAcIAhAAIAAgcQAAgdgDgJQgEgIgKAAQgKAAgDAHg");
	this.shape_54.setTransform(239,10.55);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#333333").s().p("AhIC8Ig5l2IBmAAIAgEQQADgeAJh0IALh+IBmAAIg1F2g");
	this.shape_55.setTransform(207.8,10.55);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#333333").s().p("Ag6DlIAAl2IB1AAIAAF2gAg6ioIAAg8IB1AAIAAA8g");
	this.shape_56.setTransform(183.475,6.425);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#333333").s().p("AAqDVQgngBgQgDQgRgDgNgLQgMgMgDgPQgEgQAAg3IAAi+IgZAAIAAg7IAZAAIAAg8IByAAIAAA8IAeAAIAAA7IgeAAIAADIQAAAlADAEQAFAEAcAAIAAA9g");
	this.shape_57.setTransform(163.05,8.05);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#333333").s().p("AhnCxQgZgRAAg4IAAgfQAAgqANgQQAOgOA0gUQA3gWAEgIQAEgHAAgYQAAgdgEgJQgEgJgKAAQgLAAgDAHQgDAIAAAgIAAAmIhrAAIAAgZQAAgrAKgXQAKgYAegTQAfgRAvgBQA6AAAdAVQAeAUAGAeQAGAeAABdIAAC8IhwAAIAAgiQgKAUgPAKQgRAKgXAAQgeABgZgSgAgQArQgFANAAAaQAAAdAEAJQAEAIALAAQAKAAADgHQADgGAAgdIAAhNQgaAUgEAOg");
	this.shape_58.setTransform(135.675,10.55);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#333333").s().p("Ag7C4QgdgLgPgRQgPgTgGgWQgGgWAAgqIAAhsQAAgyANgbQAOgdAegPQAegQAnAAQAwAAAfATQAfASANAfQAMAdAAA3IAAAwIiTAAIAABRQAAAaAEAHQADAIAKAAQANAAAFgKQADgJAAgcIAAgyIBtAAIAAAbQAAAjgEATQgFATgQAVQgQAVgYALQgaAKglAAQgjAAgbgKgAgNh4QgDAIAAAfIAAAcIAgAAIAAgcQAAgdgDgJQgDgIgJAAQgLAAgDAHg");
	this.shape_59.setTransform(102.7,10.55);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#333333").s().p("AhaC/IAAl2IBxAAIgEAyQAZg2AvgDIAACEQggAAgOAIQgPAJgDAQQgEAOAAA2IAACUg");
	this.shape_60.setTransform(74.625,10.2);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#333333").s().p("AhTDcQgjgTgKgiQgLghAAhDIAAiGQAAgxADgYQADgZARgXQARgXAdgNQAfgOAmAAQA0AAAiAVQAiAUALAeQALAfAABAIAAArIh3AAIAAhPQAAgjgEgIQgEgJgNAAQgNAAgFALQgDAKAAAjIAADUQAAAhADAKQAFAKAMAAQAOAAADgKQAEgKABgmIAAg5IB3AAIAAASQgBBHgJAeQgLAdghAXQgjAVgzAAQgzAAghgSg");
	this.shape_61.setTransform(43.8,6.4);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#333333").s().p("AhkDaQgTgOgGgSQgFgTgBgpIAAivQABgrAFgSQAGgSAUgOQATgOAcAAQAUAAASAIQARAIAPAPIAAhqIBxAAIAAHIIhxAAIAAgbQgRARgRAJQgSAIgUAAQgbAAgTgOgAgNhTQgDAGAAAXIAAC2QgBAXAEAIQADAHAKAAQAKAAAEgIQAEgJAAgfIAAisQAAgVgEgHQgDgHgLAAQgKAAgDAGg");
	this.shape_62.setTransform(-5.2,6.775);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#333333").s().p("AARC/IAAkDQAAgmgCgJQgDgIgLgBQgLAAgEAKQgDAKAAArIAAD8IhyAAIAAl2IB0AAIgCAiQANgUARgKQASgLAXAAQAeAAASAOQATAOAFAVQAGAVAAAxIAAEGg");
	this.shape_63.setTransform(-38.825,10.2);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#333333").s().p("AhnCxQgZgRAAg4IAAgfQAAgqANgQQAOgOA0gUQA3gWAEgIQAEgHAAgYQAAgdgEgJQgEgJgKAAQgLAAgDAHQgDAIAAAgIAAAmIhrAAIAAgZQAAgrAKgXQAKgYAegTQAfgRAvgBQA6AAAdAVQAeAUAGAeQAGAeAABdIAAC8IhwAAIAAgiQgKAUgPAKQgRAKgXAAQgeABgZgSgAgQArQgFANAAAaQAAAdAEAJQAEAIALAAQAKAAADgHQADgGAAgdIAAhNQgaAUgEAOg");
	this.shape_64.setTransform(-72.575,10.55);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#333333").s().p("AhaC/IAAl2IBxAAIgEAyQAZg2AvgDIAACEQggAAgOAIQgPAJgDAQQgEAOAAA2IAACUg");
	this.shape_65.setTransform(-114.225,10.2);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#333333").s().p("Ag+C6QgagJgPgQQgOgRgHgYQgGgYAAgwIAAhfQAAg0AMgeQALgdAdgSQAegRAtgBQAmAAAcAMQAbAMAPASQAPASAGAUQAFATAAAoIAABbQAAAygFAZQgFAXgRAVQgRAUgaAJQgaAKgiAAQglABgagJgAgMh4QgEAIAAAdIAACoQAAAbAEAIQADAIAJAAQAKAAAEgIQADgHAAgYIAAisQAAgdgDgIQgDgHgLAAQgJAAgDAHg");
	this.shape_66.setTransform(-143.925,10.55);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#333333").s().p("AAqDVQgogBgPgDQgRgDgNgLQgNgMgCgPQgEgQAAg3IAAi+IgYAAIAAg7IAYAAIAAg8IByAAIAAA8IAeAAIAAA7IgeAAIAADIQAAAlADAEQAFAEAbAAIAAA9g");
	this.shape_67.setTransform(-171.2,8.05);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#333333").s().p("AhnCxQgZgRAAg4IAAgfQAAgqANgQQAOgOA0gUQA3gWAEgIQAEgHAAgYQAAgdgEgJQgEgJgKAAQgLAAgDAHQgDAIAAAgIAAAmIhrAAIAAgZQAAgrAKgXQAKgYAegTQAfgRAvgBQA6AAAdAVQAeAUAGAeQAGAeAABdIAAC8IhwAAIAAgiQgKAUgPAKQgRAKgXAAQgeABgZgSgAgQArQgFANAAAaQAAAdAEAJQAEAIALAAQAKAAADgHQADgGAAgdIAAhNQgaAUgEAOg");
	this.shape_68.setTransform(-198.575,10.55);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#333333").s().p("ABdC/IAAjzQAAgxgEgLQgDgMgMAAQgMAAgEAMQgDALAAAxIAADzIhuAAIAAjtQAAg4gDgLQgCgLgNAAQgHAAgFAHQgFAFgCAIIAAAkIAAEDIhuAAIAAl2IBwAAIgCAjQAOgUASgLQASgLAXAAQAuAAAZAqQAPgUASgLQASgLAWAAQAeAAATAOQATAOAFAVQAFAUAAAuIAAEKg");
	this.shape_69.setTransform(-238.95,10.2);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#333333").s().p("Ag6DlIAAl2IB1AAIAAF2gAg6ioIAAg8IB1AAIAAA8g");
	this.shape_70.setTransform(-273.025,6.425);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#333333").s().p("AARC/IAAkDQAAgmgCgJQgDgIgLgBQgLAAgEAKQgDAKAAArIAAD8IhyAAIAAl2IB0AAIgCAiQANgUARgKQASgLAXAAQAeAAASAOQATAOAFAVQAGAVAAAxIAAEGg");
	this.shape_71.setTransform(-299.725,10.2);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#333333").s().p("AAdDlIgHhTIgpAAIgHBTIh7AAIA8nJICrAAIBEHJgAgVBBIAoAAQgJhMgJhzQgRCDgFA8g");
	this.shape_72.setTransform(-333.375,6.425);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#333333").s().p("AiJDlIAAnJIBaAAQBVAAAeAIQAeAIAQASQAQASAEAWQAEAWAABBIAACgQAAA9gGAVQgFAVgPAMQgPALgVAFQgVAFgrAAgAgRCWQAYAAAGgKQAGgKAAguIAAixQAAgfgCgJQgCgIgHgEQgHgFgSAAg");
	this.shape_73.setTransform(-381.65,6.425);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#333333").s().p("AhTDcQgfgTgKgaQgKgbAAhBIAAgkIByAAIAABKQAAAeAEAIQADAIANAAQAMAAAEgKQAEgKAAgrIAAggQAAgagGgMQgFgMgLgEQgMgEghgBIAAhBQApAAAIgDQAKgDAEgLQAEgKAAgXIAAgZQAAgYgEgIQgFgHgLAAQgLAAgEAIQgFAIAAAaIAAAmIhyAAIAAgnQAAhCAegXQAegXBBAAQBRAAAdAgQAdAgAAA5QAAAmgKARQgLARgaAPQAaAIANAUQANATAABKQAAA2gNAeQgMAegfAQQgeAQgwAAQg1AAgfgSg");
	this.shape_74.setTransform(-417.025,6.425);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#333333").s().p("AhuDuICInbIBVAAIiHHbg");
	this.shape_75.setTransform(-447.35,6.425);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#333333").s().p("AiJDlIAAnJIBZAAQBVAAAfAIQAfAIAPASQAQASAEAWQAEAWAABBIAACgQAAA9gGAVQgFAVgPAMQgPALgVAFQgVAFgqAAgAgSCWQAZAAAGgKQAGgKAAguIAAixQAAgfgCgJQgCgIgHgEQgHgFgTAAg");
	this.shape_76.setTransform(-478.35,6.425);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#333333").s().p("AiCDpIAAhBQBwi2AUgrQAVgrAAgZQAAgSgGgJQgGgKgMAAQgOAAgGAKQgHALABAeIAAArIhnAAIAAgQQAAgnAEgWQAEgWAQgWQAPgVAZgLQAZgLAjAAQBDAAAjAiQAjAhgBA0QAAAngTAsQgUArhfCOIB8AAIAABOg");
	this.shape_77.setTransform(-512.7,5.975);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#333333").s().p("AgqAvIAAhdIBVAAIAABdg");
	this.shape_78.setTransform(276.325,-80.575);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#333333").s().p("AhtDlIAAhDIBckqIhRAAIAAhcIDQAAIAABcIhZERIBZAAIAABcg");
	this.shape_79.setTransform(254.375,-98.775);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#333333").s().p("AhDDcQgfgOgQgVQgQgWgCgYQgDgZAAhNIAAkOIB3AAIAAFWQAAAfADAIQADAIAKAAQALAAADgJQADgJAAgiIAAlRIB3AAIAAExQAAA0gDAVQgEAWgQAVQgRAXgbALQgcAMglgBQgoAAgfgNg");
	this.shape_80.setTransform(223.475,-98.3);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#333333").s().p("AAWDlIAAiYQABglgGgJQgGgJgYAAIAADPIh3AAIAAnJIBUAAQBUAAAdAHQAeAGAUAbQASAbAAA6QAAA1gOATQgNASgnAEQAkAJAMANQAMAPADAMQADANAAA3IAAB5gAgNgwQAUAAAHgFQAIgGAAgeIAAgZQABgWgIgHQgIgHgUAAg");
	this.shape_81.setTransform(188.4,-98.775);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#333333").s().p("AhmDlIAAnJIDFAAIAABcIhPAAIAABWIBKAAIAABXIhKAAIAABkIBXAAIAABcg");
	this.shape_82.setTransform(157.625,-98.775);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#333333").s().p("Ag7DlIAAnJIB3AAIAAHJg");
	this.shape_83.setTransform(132.875,-98.775);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#333333").s().p("AAdDlIgHhTIgpAAIgHBTIh7AAIA8nJICrAAIBEHJgAgVBBIAoAAQgJhMgJhzQgRCDgFA8g");
	this.shape_84.setTransform(106.125,-98.775);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#333333").s().p("AhkDlIAAnJIDJAAIAABcIhTAAIAABWIBKAAIAABXIhKAAIAADAg");
	this.shape_85.setTransform(78.25,-98.775);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#333333").s().p("AiJDlIAAnJIBZAAQBVAAAfAIQAeAIAQASQAQASAEAWQAEAWAABBIAACgQAAA9gGAVQgGAVgOAMQgOALgWAFQgVAFgqAAgAgSCWQAZAAAGgKQAGgKAAguIAAixQAAgfgCgJQgCgIgHgEQgHgFgTAAg");
	this.shape_86.setTransform(32.3,-98.775);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#333333").s().p("AAdDlIgHhTIgpAAIgHBTIh7AAIA8nJICrAAIBEHJgAgVBBIAoAAQgJhMgJhzQgRCDgFA8g");
	this.shape_87.setTransform(-2.275,-98.775);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#333333").s().p("ABQDlIAAk0IgqE0IhJAAIgrktIAAEtIhpAAIAAnJICbAAIAOBhIAQB1IAbjWICbAAIAAHJg");
	this.shape_88.setTransform(-41.475,-98.775);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#333333").s().p("AASDlIAAjAIgjAAIAADAIh3AAIAAnJIB3AAIAACkIAjAAIAAikIB3AAIAAHJg");
	this.shape_89.setTransform(-82,-98.775);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#333333").s().p("AAdDlIgHhTIgpAAIgHBTIh7AAIA8nJICrAAIBEHJgAgVBBIAoAAQgJhMgJhzQgRCDgFA8g");
	this.shape_90.setTransform(-116.475,-98.775);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#333333").s().p("ABcC/IAAj0QAAgwgCgLQgEgMgMAAQgMAAgEAMQgDALAAAwIAAD0IhuAAIAAjtQAAg3gDgMQgCgKgMgBQgIAAgGAHQgEAFgBAIIgBAkIAAEDIhvAAIAAl2IBxAAIgCAjQANgUATgLQASgLAYAAQAsAAAbAqQAOgUASgLQATgLAWAAQAdAAASAOQAUAOAFAVQAGAUgBAvIAAEJg");
	this.shape_91.setTransform(-171.15,-95);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#333333").s().p("AgbBKIgPhNIAAhGIBVAAIAABGIgNBNg");
	this.shape_92.setTransform(-202.625,-114.3);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#333333").s().p("Ag7DlIAAnJIB3AAIAAHJg");
	this.shape_93.setTransform(-220.075,-98.775);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#333333").s().p("AglApQAQgKADgPIgTAAIAAhZIBLAAIAAApQAAAggHATQgIAVgSAPQgTAOgXAFg");
	this.shape_94.setTransform(-250.95,-77.45);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#333333").s().p("Ag6DlIAAl2IB1AAIAAF2gAg6ioIAAg8IB1AAIAAA8g");
	this.shape_95.setTransform(-267.475,-98.775);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#333333").s().p("AASDlIAAjAIgiAAIAADAIh4AAIAAnJIB4AAIAACkIAiAAIAAikIB3AAIAAHJg");
	this.shape_96.setTransform(-295.2,-98.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-529.1,-136.2,1058.3000000000002,298.29999999999995);


(lib.Tween4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EibEAkLMAAAgrBMAsrAAAIAA9UMDbQAAAIAAdUMAuOAAAMAAAArBg");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-992.4,-231.5,1984.9,463);


(lib.Tween3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("AgvC7IAAl1IBgAAIAAF1g");
	this.shape.setTransform(283.65,0.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("ABBC7IAAj7IgiD7Ig7AAIgkj2IAAD2IhVAAIAAl1IB+AAIALBQIANBfIAWivIB/AAIAAF1g");
	this.shape_1.setTransform(259.925,0.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AhYC7IAAg2IBKj0IhCAAIAAhLICpAAIAABLIhIDfIBIAAIAABLg");
	this.shape_2.setTransform(233.475,0.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AAXC7IgFhDIgiAAIgFBDIhlAAIAyl1ICLAAIA4F1gAgRA1IAhAAQgIg+gHhdQgOBqgEAxg");
	this.shape_3.setTransform(211.075,0.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AhvC7IAAl1IBIAAQBGAAAZAHQAYAGANAPQANAPADASQADASAAA1IAACCQAAAygEARQgFARgMAKQgMAJgRAEQgRAEgjAAgAgOB7QAUAAAFgIQAEgJAAglIAAiQQAAgagBgHQgCgHgGgDQgFgEgPAAg");
	this.shape_4.setTransform(177.825,0.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("AAOC7IAAidIgbAAIAACdIhiAAIAAl1IBiAAIAACGIAbAAIAAiGIBiAAIAAF1g");
	this.shape_5.setTransform(151.55,0.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333333").s().p("Ag1C5QgYgLgOgTQgPgUgCgWQgDgYAAg5IAAg/QAAg5ADgWQACgYAOgUQAOgTAYgKQAYgKAeAAQAegBAYAKQAYAKAOAUQAPATADAXQACAXAAA6IAAA/QAAA4gCAYQgDAXgOATQgOATgXALQgYALggAAQgdgBgYgJgAgKh9QgEAGAAAdIAACtQAAAhADAIQACAHAJAAQAKAAADgIQACgJAAgiIAAiqQAAgagCgHQgDgIgJABQgHAAgEAFg");
	this.shape_6.setTransform(125.475,0.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#333333").s().p("ABBC7IAAj7IgiD7Ig7AAIgkj2IAAD2IhVAAIAAl1IB+AAIALBQIANBfIAWivIB/AAIAAF1g");
	this.shape_7.setTransform(95.675,0.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("AAXC7IgxiqIAACqIhRAAIAAl1IBRAAIA1CpIAAipIBRAAIAAF1g");
	this.shape_8.setTransform(57.675,0.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#333333").s().p("AgwC7IAAl1IBgAAIAAF1g");
	this.shape_9.setTransform(38.1,0.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#333333").s().p("AhwC7IAAl1IBgAAQAuAAAYAIQAXAHAOAVQAPAWAAAxQAAAggKANQgLANgeAHQAiAIAMAQQAMASAAAlIAAAiQAAAmgIASQgKASgSAHQgTAHg6AAgAgPB7QATgBAGgGQAGgFAAgXIAAgjQAAgYgGgFQgFgFgUgBgAgPgnIAJAAQAOAAAEgHQAEgHAAghQAAgSgEgHQgDgHgFgCQgEgBgPgBg");
	this.shape_10.setTransform(18.5,0.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#333333").s().p("AhYC7IAAg2IBKj0IhCAAIAAhLICpAAIAABLIhIDfIBIAAIAABLg");
	this.shape_11.setTransform(-12.625,0.125);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#333333").s().p("Ag3C0QgZgMgNgRQgNgSgCgUQgCgTAAhAIAAjcIBhAAIAAEXQAAAZADAHQADAGAHAAQAIAAAEgHQACgIAAgbIAAkTIBhAAIAAD5QAAAqgDASQgDARgNASQgNASgXAJQgWAKgeAAQghAAgagLg");
	this.shape_12.setTransform(-34.75,0.525);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#333333").s().p("AASC7IAAh8QAAgegEgHQgFgIgTAAIAACpIhhAAIAAl1IBEAAQBEAAAZAGQAYAFAPAWQAPAWAAAvQAAAsgKAPQgLAPggADQAdAHAKALQAKAMACAKQACAKAAAtIAABjgAgKgnQAPAAAHgEQAGgFAAgYIAAgVQAAgSgGgFQgGgGgQAAg");
	this.shape_13.setTransform(-60.325,0.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#333333").s().p("AhTC7IAAl1IChAAIAABLIhBAAIAABHIA8AAIAABGIg8AAIAABSIBHAAIAABLg");
	this.shape_14.setTransform(-82.4,0.125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#333333").s().p("AgwC7IAAl1IBhAAIAAF1g");
	this.shape_15.setTransform(-99.55,0.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#333333").s().p("AAXC7IgFhDIgiAAIgFBDIhlAAIAyl1ICLAAIA4F1gAgRA1IAhAAQgIg+gHhdQgOBqgEAxg");
	this.shape_16.setTransform(-118.275,0.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#333333").s().p("AhRC7IAAl1ICjAAIAABLIhDAAIAABHIA8AAIAABGIg8AAIAACdg");
	this.shape_17.setTransform(-137.975,0.125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#333333").s().p("AhvC7IAAl1IBIAAQBGAAAZAHQAYAGANAPQANAPADASQADASAAA1IAACCQAAAygEARQgFARgMAKQgMAJgRAEQgRAEgjAAgAgOB7QAUAAAFgIQAEgJAAglIAAiQQAAgagBgHQgCgHgGgDQgFgEgPAAg");
	this.shape_18.setTransform(-169.375,0.125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#333333").s().p("AAXC7IgFhDIgiAAIgFBDIhlAAIAyl1ICLAAIA4F1gAgRA1IAhAAQgIg+gHhdQgOBqgEAxg");
	this.shape_19.setTransform(-194.525,0.125);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#333333").s().p("ABBC7IAAj7IgiD7Ig7AAIgkj2IAAD2IhVAAIAAl1IB+AAIALBQIANBfIAWivIB/AAIAAF1g");
	this.shape_20.setTransform(-223.475,0.125);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#333333").s().p("AAOC7IAAidIgcAAIAACdIhhAAIAAl1IBhAAIAACGIAcAAIAAiGIBhAAIAAF1g");
	this.shape_21.setTransform(-253.5,0.125);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#333333").s().p("AAXC7IgFhDIgiAAIgFBDIhlAAIAyl1ICLAAIA4F1gAgRA1IAhAAQgIg+gHhdQgOBqgEAxg");
	this.shape_22.setTransform(-278.525,0.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-291.8,-30.1,583.7,60.2);


(lib.Tween2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EiVtAMBIAA4BMErbAAAIAAYBg");
	this.shape.setTransform(0,-5.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-958.2,-82.3,1916.5,153.7);


(lib.Tween1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.FAIERUZMAIN();
	this.instance.setTransform(-960,-540);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-960,-540,1920,1080);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.UPSILOGO();
	this.instance.setTransform(0,0,0.5293,0.5293);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1016.3,571.7);


(lib.NEXT4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgiCEIAAjSIgoAAIAAg1ICVAAIAAA1IgpAAIAADSg");
	this.shape.setTransform(135.15,21.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AATCEQgMgngIg5QgCAZgFAcIgGArIhEAAIAZiSIgZh1IBDAAIAHAkIAHAkIAOhIIA5AAIgYB1IAlCSg");
	this.shape_1.setTransform(117.45,21.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ag6CEIAAkHIBxAAIAAA1IguAAIAAAyIArAAIAAAxIgrAAIAAA6IAzAAIAAA1g");
	this.shape_2.setTransform(100.5,21.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAQCEIgih4IAAB4Ig6AAIAAkHIA6AAIAlB3IAAh3IA6AAIAAEHg");
	this.shape_3.setTransform(82.025,21.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AuXDSQhXAAg+g9Qg9g+AAhXQAAhWA9g9QA+g+BXAAIcvAAQBXAAA+A+QA9A9AABWQAABXg9A+Qg+A9hXAAg");
	this.shape_4.setTransform(107.8694,22.3076,0.9543,0.9543);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,215.8,42.9);


(lib.NEXT3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgiCEIAAjSIgoAAIAAg1ICVAAIAAA1IgpAAIAADSg");
	this.shape.setTransform(135.15,21.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AATCEQgMgngIg5QgCAZgFAcIgGArIhEAAIAZiSIgZh1IBDAAIAHAkIAHAkIAOhIIA5AAIgYB1IAlCSg");
	this.shape_1.setTransform(117.45,21.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ag6CEIAAkHIBxAAIAAA1IguAAIAAAyIArAAIAAAxIgrAAIAAA6IAzAAIAAA1g");
	this.shape_2.setTransform(100.5,21.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAQCEIgih4IAAB4Ig6AAIAAkHIA6AAIAlB3IAAh3IA6AAIAAEHg");
	this.shape_3.setTransform(82.025,21.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AuXDSQhXAAg+g9Qg9g+AAhXQAAhWA9g9QA+g+BXAAIcvAAQBXAAA+A+QA9A9AABWQAABXg9A+Qg+A9hXAAg");
	this.shape_4.setTransform(107.8694,22.3076,0.9543,0.9543);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,215.8,42.9);


(lib.NEXT2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgiCEIAAjSIgoAAIAAg1ICVAAIAAA1IgpAAIAADSg");
	this.shape.setTransform(135.15,21.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AATCEQgMgngIg5QgCAZgFAcIgGArIhEAAIAZiSIgZh1IBDAAIAHAkIAHAkIAOhIIA5AAIgYB1IAlCSg");
	this.shape_1.setTransform(117.45,21.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ag6CEIAAkHIBxAAIAAA1IguAAIAAAyIArAAIAAAxIgrAAIAAA6IAzAAIAAA1g");
	this.shape_2.setTransform(100.5,21.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAQCEIgih4IAAB4Ig6AAIAAkHIA6AAIAlB3IAAh3IA6AAIAAEHg");
	this.shape_3.setTransform(82.025,21.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AuXDSQhXAAg+g9Qg9g+AAhXQAAhWA9g9QA+g+BXAAIcvAAQBXAAA+A+QA9A9AABWQAABXg9A+Qg+A9hXAAg");
	this.shape_4.setTransform(107.8694,22.3076,0.9543,0.9543);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,215.8,42.9);


(lib.NEXT1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgiCEIAAjSIgoAAIAAg1ICVAAIAAA1IgpAAIAADSg");
	this.shape.setTransform(135.15,21.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AATCEQgMgngIg5QgCAZgFAcIgGArIhEAAIAZiSIgZh1IBDAAIAHAkIAHAkIAOhIIA5AAIgYB1IAlCSg");
	this.shape_1.setTransform(117.45,21.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ag6CEIAAkHIBxAAIAAA1IguAAIAAAyIArAAIAAAxIgrAAIAAA6IAzAAIAAA1g");
	this.shape_2.setTransform(100.5,21.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAQCEIgih4IAAB4Ig6AAIAAkHIA6AAIAlB3IAAh3IA6AAIAAEHg");
	this.shape_3.setTransform(82.025,21.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AuXDSQhXAAg+g9Qg9g+AAhXQAAhWA9g9QA+g+BXAAIcvAAQBXAAA+A+QA9A9AABWQAABXg9A+Qg+A9hXAAg");
	this.shape_4.setTransform(107.8694,22.3076,0.9543,0.9543);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,215.8,42.9);


(lib.HOME5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.TOONIGHTLOGO();
	this.instance.setTransform(0,0,0.0375,0.0375);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,124.1,94.2);


(lib.HOME4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.TOONIGHTLOGO();
	this.instance.setTransform(0,0,0.0375,0.0375);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,124.1,94.2);


(lib.HOME3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.TOONIGHTLOGO();
	this.instance.setTransform(0,0,0.0375,0.0375);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,124.1,94.2);


(lib.HOME2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.TOONIGHTLOGO();
	this.instance.setTransform(0,0,0.0375,0.0375);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,124.1,94.2);


(lib.HOME1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.TOONIGHTLOGO();
	this.instance.setTransform(0,0,0.0375,0.0375);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,124.1,94.2);


(lib.BACK4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgsB/QgTgLgGgQQgGgPAAgeIAAgSIBAAAIAAAhQAAAOACAFQADAEAGAAQAHAAADgFQADgGAAgKQAAgXgGgIQgHgHgYgRQgagRgIgHQgIgHgGgNQgFgOAAgVQAAgfAIgNQAHgPARgHQASgIAYAAQAaAAATAJQATAIAGANQAGANAAAgIAAAKIhAAAIAAgUQAAgNgCgEQgDgEgFABQgGAAgDAEQgDAGAAAKQAAANAEAGQADAIAPAJQAuAbAMARQALARAAAmQAAAcgGAOQgHAOgTAIQgTAKgZgBQgaAAgUgKg");
	this.shape.setTransform(170.825,21.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgmB/QgSgIgJgMQgJgNgBgOQgCgOgBgsIAAicIBFAAIAADFQABASABAEQACAFAFAAQAGAAACgFQACgFAAgUIAAjCIBFAAIAACwQAAAegCAMQgCAMgKANQgKANgPAGQgQAHgWAAQgWAAgSgIg");
	this.shape_1.setTransform(150.9,21.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AglCCQgRgGgKgOQgLgOgBgQQgCgQAAgqIAAgsQAAgnACgRQABgRAKgNQAKgNARgIQAQgIAWABQAVAAARAGQARAIAKAOQALAOABAPQACARAAAoIAAAsQAAAogCARQgBAQgKAOQgKAOgRAHQgQAHgXAAQgUABgRgIgAgHhYQgDAEAAAVIAAB6QAAAXADAGQABAFAGAAQAHAAACgGQACgGAAgYIAAh4QAAgSgCgGQgCgEgGAAQgFAAgDADg");
	this.shape_2.setTransform(130.5,21.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgiCEIAAkHIBFAAIAAEHg");
	this.shape_3.setTransform(114.45,21.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgxCEIgokHIBJAAQAMBtAFBLQAFhMAGg6IAFgyIBIAAIgjEHg");
	this.shape_4.setTransform(98.8,21.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag7CEIAAkHIByAAIAAA1IgtAAIAAAyIAqAAIAAAxIgqAAIAAA6IAxAAIAAA1g");
	this.shape_5.setTransform(81.3,21.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AANCEIAAhXQAAgWgDgFQgEgFgNAAIAAB3IhFAAIAAkHIAxAAQAwAAARAEQARADALAQQALAPAAAiQAAAfgIALQgIAKgWACQAUAFAHAIQAHAIACAIQACAHAAAgIAABFgAgHgbQALAAAEgDQAFgDAAgSIAAgOQAAgNgFgDQgEgFgLAAg");
	this.shape_6.setTransform(62.925,21.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AhJCEIAAkHIBFAAQAcAAAPAFQAOAEAIAIQAHAJAEALQACAMAAAZIAAAXQAAAZgGALQgEAMgPAFQgOAHgWAAIgRAAIAABqgAgEgSIAEAAQAJgBAEgEQADgFAAgPIAAgVQAAgOgDgDQgFgFgMAAg");
	this.shape_7.setTransform(43.75,21.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("AuXDSQhXAAg+g9Qg9g+AAhXQAAhWA9g9QA+g+BXAAIcvAAQBXAAA+A+QA9A9AABWQAABXg9A+Qg+A9hXAAg");
	this.shape_8.setTransform(107.8694,22.3076,0.9543,0.9543);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,215.8,42.9);


(lib.BACK3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgsB/QgTgLgGgQQgGgPAAgeIAAgSIBAAAIAAAhQAAAOACAFQADAEAGAAQAHAAADgFQADgGAAgKQAAgXgGgIQgHgHgYgRQgagRgIgHQgIgHgGgNQgFgOAAgVQAAgfAIgNQAHgPARgHQASgIAYAAQAaAAATAJQATAIAGANQAGANAAAgIAAAKIhAAAIAAgUQAAgNgCgEQgDgEgFABQgGAAgDAEQgDAGAAAKQAAANAEAGQADAIAPAJQAuAbAMARQALARAAAmQAAAcgGAOQgHAOgTAIQgTAKgZgBQgaAAgUgKg");
	this.shape.setTransform(170.825,21.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgmB/QgSgIgJgMQgJgNgBgOQgCgOgBgsIAAicIBFAAIAADFQABASABAEQACAFAFAAQAGAAACgFQACgFAAgUIAAjCIBFAAIAACwQAAAegCAMQgCAMgKANQgKANgPAGQgQAHgWAAQgWAAgSgIg");
	this.shape_1.setTransform(150.9,21.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AglCCQgRgGgKgOQgLgOgBgQQgCgQAAgqIAAgsQAAgnACgRQABgRAKgNQAKgNARgIQAQgIAWABQAVAAARAGQARAIAKAOQALAOABAPQACARAAAoIAAAsQAAAogCARQgBAQgKAOQgKAOgRAHQgQAHgXAAQgUABgRgIgAgHhYQgDAEAAAVIAAB6QAAAXADAGQABAFAGAAQAHAAACgGQACgGAAgYIAAh4QAAgSgCgGQgCgEgGAAQgFAAgDADg");
	this.shape_2.setTransform(130.5,21.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgiCEIAAkHIBFAAIAAEHg");
	this.shape_3.setTransform(114.45,21.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgxCEIgokHIBJAAQAMBtAFBLQAFhMAGg6IAFgyIBIAAIgjEHg");
	this.shape_4.setTransform(98.8,21.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag7CEIAAkHIByAAIAAA1IgtAAIAAAyIAqAAIAAAxIgqAAIAAA6IAxAAIAAA1g");
	this.shape_5.setTransform(81.3,21.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AANCEIAAhXQAAgWgDgFQgEgFgNAAIAAB3IhFAAIAAkHIAxAAQAwAAARAEQARADALAQQALAPAAAiQAAAfgIALQgIAKgWACQAUAFAHAIQAHAIACAIQACAHAAAgIAABFgAgHgbQALAAAEgDQAFgDAAgSIAAgOQAAgNgFgDQgEgFgLAAg");
	this.shape_6.setTransform(62.925,21.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AhJCEIAAkHIBFAAQAcAAAPAFQAOAEAIAIQAHAJAEALQACAMAAAZIAAAXQAAAZgGALQgEAMgPAFQgOAHgWAAIgRAAIAABqgAgEgSIAEAAQAJgBAEgEQADgFAAgPIAAgVQAAgOgDgDQgFgFgMAAg");
	this.shape_7.setTransform(43.75,21.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("AuXDSQhXAAg+g9Qg9g+AAhXQAAhWA9g9QA+g+BXAAIcvAAQBXAAA+A+QA9A9AABWQAABXg9A+Qg+A9hXAAg");
	this.shape_8.setTransform(107.8694,22.3076,0.9543,0.9543);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,215.8,42.9);


(lib.BACK2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgsB/QgTgLgGgQQgGgPAAgeIAAgSIBAAAIAAAhQAAAOACAFQADAEAGAAQAHAAADgFQADgGAAgKQAAgXgGgIQgHgHgYgRQgagRgIgHQgIgHgGgNQgFgOAAgVQAAgfAIgNQAHgPARgHQASgIAYAAQAaAAATAJQATAIAGANQAGANAAAgIAAAKIhAAAIAAgUQAAgNgCgEQgDgEgFABQgGAAgDAEQgDAGAAAKQAAANAEAGQADAIAPAJQAuAbAMARQALARAAAmQAAAcgGAOQgHAOgTAIQgTAKgZgBQgaAAgUgKg");
	this.shape.setTransform(170.825,21.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgmB/QgSgIgJgMQgJgNgBgOQgCgOgBgsIAAicIBFAAIAADFQABASABAEQACAFAFAAQAGAAACgFQACgFAAgUIAAjCIBFAAIAACwQAAAegCAMQgCAMgKANQgKANgPAGQgQAHgWAAQgWAAgSgIg");
	this.shape_1.setTransform(150.9,21.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AglCCQgRgGgKgOQgLgOgBgQQgCgQAAgqIAAgsQAAgnACgRQABgRAKgNQAKgNARgIQAQgIAWABQAVAAARAGQARAIAKAOQALAOABAPQACARAAAoIAAAsQAAAogCARQgBAQgKAOQgKAOgRAHQgQAHgXAAQgUABgRgIgAgHhYQgDAEAAAVIAAB6QAAAXADAGQABAFAGAAQAHAAACgGQACgGAAgYIAAh4QAAgSgCgGQgCgEgGAAQgFAAgDADg");
	this.shape_2.setTransform(130.5,21.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgiCEIAAkHIBFAAIAAEHg");
	this.shape_3.setTransform(114.45,21.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgxCEIgokHIBJAAQAMBtAFBLQAFhMAGg6IAFgyIBIAAIgjEHg");
	this.shape_4.setTransform(98.8,21.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag7CEIAAkHIByAAIAAA1IgtAAIAAAyIAqAAIAAAxIgqAAIAAA6IAxAAIAAA1g");
	this.shape_5.setTransform(81.3,21.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AANCEIAAhXQAAgWgDgFQgEgFgNAAIAAB3IhFAAIAAkHIAxAAQAwAAARAEQARADALAQQALAPAAAiQAAAfgIALQgIAKgWACQAUAFAHAIQAHAIACAIQACAHAAAgIAABFgAgHgbQALAAAEgDQAFgDAAgSIAAgOQAAgNgFgDQgEgFgLAAg");
	this.shape_6.setTransform(62.925,21.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AhJCEIAAkHIBFAAQAcAAAPAFQAOAEAIAIQAHAJAEALQACAMAAAZIAAAXQAAAZgGALQgEAMgPAFQgOAHgWAAIgRAAIAABqgAgEgSIAEAAQAJgBAEgEQADgFAAgPIAAgVQAAgOgDgDQgFgFgMAAg");
	this.shape_7.setTransform(43.75,21.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("AuXDSQhXAAg+g9Qg9g+AAhXQAAhWA9g9QA+g+BXAAIcvAAQBXAAA+A+QA9A9AABWQAABXg9A+Qg+A9hXAAg");
	this.shape_8.setTransform(107.8694,22.3076,0.9543,0.9543);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,215.8,42.9);


(lib.BACK1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgsB/QgTgLgGgQQgGgPAAgeIAAgSIBAAAIAAAhQAAAOACAFQADAEAGAAQAHAAADgFQADgGAAgKQAAgXgGgIQgHgHgYgRQgagRgIgHQgIgHgGgNQgFgOAAgVQAAgfAIgNQAHgPARgHQASgIAYAAQAaAAATAJQATAIAGANQAGANAAAgIAAAKIhAAAIAAgUQAAgNgCgEQgDgEgFABQgGAAgDAEQgDAGAAAKQAAANAEAGQADAIAPAJQAuAbAMARQALARAAAmQAAAcgGAOQgHAOgTAIQgTAKgZgBQgaAAgUgKg");
	this.shape.setTransform(170.825,21.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgmB/QgSgIgJgMQgJgNgBgOQgCgOgBgsIAAicIBFAAIAADFQABASABAEQACAFAFAAQAGAAACgFQACgFAAgUIAAjCIBFAAIAACwQAAAegCAMQgCAMgKANQgKANgPAGQgQAHgWAAQgWAAgSgIg");
	this.shape_1.setTransform(150.9,21.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AglCCQgRgGgKgOQgLgOgBgQQgCgQAAgqIAAgsQAAgnACgRQABgRAKgNQAKgNARgIQAQgIAWABQAVAAARAGQARAIAKAOQALAOABAPQACARAAAoIAAAsQAAAogCARQgBAQgKAOQgKAOgRAHQgQAHgXAAQgUABgRgIgAgHhYQgDAEAAAVIAAB6QAAAXADAGQABAFAGAAQAHAAACgGQACgGAAgYIAAh4QAAgSgCgGQgCgEgGAAQgFAAgDADg");
	this.shape_2.setTransform(130.5,21.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgiCEIAAkHIBFAAIAAEHg");
	this.shape_3.setTransform(114.45,21.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgxCEIgokHIBJAAQAMBtAFBLQAFhMAGg6IAFgyIBIAAIgjEHg");
	this.shape_4.setTransform(98.8,21.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag7CEIAAkHIByAAIAAA1IgtAAIAAAyIAqAAIAAAxIgqAAIAAA6IAxAAIAAA1g");
	this.shape_5.setTransform(81.3,21.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AANCEIAAhXQAAgWgDgFQgEgFgNAAIAAB3IhFAAIAAkHIAxAAQAwAAARAEQARADALAQQALAPAAAiQAAAfgIALQgIAKgWACQAUAFAHAIQAHAIACAIQACAHAAAgIAABFgAgHgbQALAAAEgDQAFgDAAgSIAAgOQAAgNgFgDQgEgFgLAAg");
	this.shape_6.setTransform(62.925,21.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AhJCEIAAkHIBFAAQAcAAAPAFQAOAEAIAIQAHAJAEALQACAMAAAZIAAAXQAAAZgGALQgEAMgPAFQgOAHgWAAIgRAAIAABqgAgEgSIAEAAQAJgBAEgEQADgFAAgPIAAgVQAAgOgDgDQgFgFgMAAg");
	this.shape_7.setTransform(43.75,21.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("AuXDSQhXAAg+g9Qg9g+AAhXQAAhWA9g9QA+g+BXAAIcvAAQBXAAA+A+QA9A9AABWQAABXg9A+Qg+A9hXAAg");
	this.shape_8.setTransform(107.8694,22.3076,0.9543,0.9543);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,215.8,42.9);


// stage content:
(lib.index = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0,19,39,59,79,99];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_19 = function() {
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.N1.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(21);
		}
		
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.H1.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_9.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_9()
		{
			this.gotoAndPlay(1);
		}
		this.stop();
	}
	this.frame_39 = function() {
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.N2.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_2.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_2()
		{
			this.gotoAndPlay(41);
		}
		
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.B1.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_5.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_5()
		{
			this.gotoAndPlay(1);
		}
		
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.H2.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_10.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_10()
		{
			this.gotoAndPlay(1);
		}
		this.stop();
	}
	this.frame_59 = function() {
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.N3.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_3.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_3()
		{
			this.gotoAndPlay(61);
		}
		
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.B2.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_6.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_6()
		{
			this.gotoAndPlay(21);
		}
		
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.H3.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_11.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_11()
		{
			this.gotoAndPlay(1);
		}
		this.stop();
	}
	this.frame_79 = function() {
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.N4.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_4.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_4()
		{
			this.gotoAndPlay(81);
		}
		
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.B3.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_7.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_7()
		{
			this.gotoAndPlay(41);
		}
		
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.H4.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_12.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_12()
		{
			this.gotoAndPlay(1);
		}
		this.stop();
	}
	this.frame_99 = function() {
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.B4.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_8.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_8()
		{
			this.gotoAndPlay(61);
		}
		
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.H5.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_13.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_13()
		{
			this.gotoAndPlay(1);
		}
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(19).call(this.frame_19).wait(20).call(this.frame_39).wait(20).call(this.frame_59).wait(20).call(this.frame_79).wait(20).call(this.frame_99).wait(1));

	// BUTTON
	this.H1 = new lib.HOME1();
	this.H1.name = "H1";
	this.H1.setTransform(127.1,72.1,1,1,0,0,0,62.1,47.1);
	new cjs.ButtonHelper(this.H1, 0, 1, 1);

	this.N1 = new lib.NEXT1();
	this.N1.name = "N1";
	this.N1.setTransform(1759.4,75.05,1,1,0,0,0,107.9,21.4);
	new cjs.ButtonHelper(this.N1, 0, 1, 1);

	this.H2 = new lib.HOME2();
	this.H2.name = "H2";
	this.H2.setTransform(127.1,72.1,1,1,0,0,0,62.1,47.1);
	new cjs.ButtonHelper(this.H2, 0, 1, 1);

	this.B1 = new lib.BACK1();
	this.B1.name = "B1";
	this.B1.setTransform(1521.35,75.05,1,1,0,0,0,107.9,21.4);
	new cjs.ButtonHelper(this.B1, 0, 1, 1);

	this.N2 = new lib.NEXT2();
	this.N2.name = "N2";
	this.N2.setTransform(1759.4,75.05,1,1,0,0,0,107.9,21.4);
	new cjs.ButtonHelper(this.N2, 0, 1, 1);

	this.H3 = new lib.HOME3();
	this.H3.name = "H3";
	this.H3.setTransform(127.1,72.1,1,1,0,0,0,62.1,47.1);
	new cjs.ButtonHelper(this.H3, 0, 1, 1);

	this.B2 = new lib.BACK2();
	this.B2.name = "B2";
	this.B2.setTransform(1521.35,75.05,1,1,0,0,0,107.9,21.4);
	new cjs.ButtonHelper(this.B2, 0, 1, 1);

	this.N3 = new lib.NEXT3();
	this.N3.name = "N3";
	this.N3.setTransform(1759.4,75.05,1,1,0,0,0,107.9,21.4);
	new cjs.ButtonHelper(this.N3, 0, 1, 1);

	this.H4 = new lib.HOME4();
	this.H4.name = "H4";
	this.H4.setTransform(1335.25,72.1,1,1,0,0,0,62.1,47.1);
	new cjs.ButtonHelper(this.H4, 0, 1, 1);

	this.B3 = new lib.BACK3();
	this.B3.name = "B3";
	this.B3.setTransform(1568.5,75.05,1,1,0,0,0,107.9,21.4);
	new cjs.ButtonHelper(this.B3, 0, 1, 1);

	this.N4 = new lib.NEXT4();
	this.N4.name = "N4";
	this.N4.setTransform(1806.55,75.05,1,1,0,0,0,107.9,21.4);
	new cjs.ButtonHelper(this.N4, 0, 1, 1);

	this.H5 = new lib.HOME5();
	this.H5.name = "H5";
	this.H5.setTransform(127.1,72.1,1,1,0,0,0,62.1,47.1);
	new cjs.ButtonHelper(this.H5, 0, 1, 1);

	this.B4 = new lib.BACK4();
	this.B4.name = "B4";
	this.B4.setTransform(1521.35,75.05,1,1,0,0,0,107.9,21.4);
	new cjs.ButtonHelper(this.B4, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.N1},{t:this.H1}]}).to({state:[{t:this.N2},{t:this.B1},{t:this.H2}]},20).to({state:[{t:this.N3},{t:this.B2},{t:this.H3}]},20).to({state:[{t:this.N4},{t:this.B3},{t:this.H4}]},20).to({state:[{t:this.B4},{t:this.H5}]},20).wait(20));

	// TOP_BORDER
	this.instance = new lib.Tween2("synched",0);
	this.instance.setTransform(0.05,-74.05,1,1,0,0,0,-958.2,0);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(80).to({_off:false},0).to({scaleX:1.0101,y:76.45,alpha:1},8).wait(12));

	// EMAIL
	this.instance_1 = new lib.Tween30("synched",0);
	this.instance_1.setTransform(947.1,1267.55);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(80).to({_off:false},0).to({y:932.3,alpha:1},8).to({startPosition:0},4).wait(8));

	// CONTACT
	this.instance_2 = new lib.Tween31("synched",0);
	this.instance_2.setTransform(948.5,1205.75);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(80).to({_off:false},0).to({y:870.5,alpha:1},8).wait(12));

	// NAME
	this.instance_3 = new lib.Tween32("synched",0);
	this.instance_3.setTransform(970.55,1129.9);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(80).to({_off:false},0).to({y:794.65,alpha:1},8).wait(12));

	// BOTTOM_BORDER
	this.instance_4 = new lib.Tween33("synched",0);
	this.instance_4.setTransform(958.85,1247.6);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(80).to({_off:false},0).to({y:912.35,alpha:1},8).wait(12));

	// PIC
	this.instance_5 = new lib.Tween34("synched",0);
	this.instance_5.setTransform(933.8,516.55);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(80).to({_off:false},0).to({alpha:1},8).wait(12));

	// BG
	this.instance_6 = new lib.Tween35("synched",0);
	this.instance_6.setTransform(960,540);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(80).to({_off:false},0).to({alpha:1},8).wait(12));

	// TOP_BORDER_copy_copy
	this.instance_7 = new lib.Tween2("synched",0);
	this.instance_7.setTransform(2384.45,74.05,0.2422,1,0,0,0,958.4,0);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(60).to({_off:false},0).to({scaleX:0.2513,x:1933.7,y:75.05,alpha:1},7).to({startPosition:0},11).to({_off:true},2).wait(20));

	// BLUE_BAR
	this.instance_8 = new lib.Tween15("synched",0);
	this.instance_8.setTransform(931.25,593.85,0.0292,1,0,0,0,-184.9,0);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(60).to({_off:false},0).to({startPosition:0},11).to({scaleX:0.8786,x:931.3,alpha:0.8789},7).to({scaleX:1,x:931.25,alpha:1},1).to({_off:true},1).wait(20));

	// BAR
	this.instance_9 = new lib.Tween14("synched",0);
	this.instance_9.setTransform(931.25,593.85,0.0247,1,0,0,0,-218.6,0);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(60).to({_off:false},0).to({scaleX:1,alpha:1},11).to({_off:true},9).wait(20));

	// DETAILS
	this.instance_10 = new lib.Tween16("synched",0);
	this.instance_10.setTransform(522.8,596.05);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(60).to({_off:false},0).to({alpha:1},5).to({startPosition:0},13).to({_off:true},2).wait(20));

	// _3DS
	this.instance_11 = new lib.Tween17("synched",0);
	this.instance_11.setTransform(128.8,818.8);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(60).to({_off:false},0).to({alpha:1},5).to({_off:true},15).wait(20));

	// TNBM
	this.instance_12 = new lib.Tween18("synched",0);
	this.instance_12.setTransform(138.5,1011);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(60).to({_off:false},0).to({alpha:1},5).to({_off:true},15).wait(20));

	// BLDR
	this.instance_13 = new lib.Tween19("synched",0);
	this.instance_13.setTransform(130.1,923.05);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(60).to({_off:false},0).to({alpha:1},5).to({_off:true},15).wait(20));

	// LR
	this.instance_14 = new lib.Tween20("synched",0);
	this.instance_14.setTransform(125.75,714.6);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(60).to({_off:false},0).to({alpha:1},5).to({_off:true},15).wait(20));

	// AE
	this.instance_15 = new lib.Tween21("synched",0);
	this.instance_15.setTransform(129.3,288.05);
	this.instance_15.alpha = 0;
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(60).to({_off:false},0).to({alpha:1},5).to({_off:true},15).wait(20));

	// AN
	this.instance_16 = new lib.Tween22("synched",0);
	this.instance_16.setTransform(128.95,394.5);
	this.instance_16.alpha = 0;
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(60).to({_off:false},0).to({alpha:1},5).to({_off:true},15).wait(20));

	// AI
	this.instance_17 = new lib.Tween23("synched",0);
	this.instance_17.setTransform(130.25,610.15);
	this.instance_17.alpha = 0;
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(60).to({_off:false},0).to({alpha:1},5).to({_off:true},15).wait(20));

	// PR
	this.instance_18 = new lib.Tween24("synched",0);
	this.instance_18.setTransform(127.65,503.35);
	this.instance_18.alpha = 0;
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(60).to({_off:false},0).to({alpha:1},5).to({_off:true},15).wait(20));

	// PS
	this.instance_19 = new lib.Tween25("synched",0);
	this.instance_19.setTransform(128.15,181.8);
	this.instance_19.alpha = 0;
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(60).to({_off:false},0).to({alpha:1},5).to({_off:true},15).wait(20));

	// SOFTWARE_SKILLS
	this.instance_20 = new lib.Tween26("synched",0);
	this.instance_20.setTransform(382.2,55.8);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(60).to({_off:false},0).to({alpha:1},5).to({startPosition:0},13).to({_off:true},2).wait(20));

	// RIGHT_BORDER
	this.instance_21 = new lib.Tween27("synched",0);
	this.instance_21.setTransform(1941.45,537.9);
	this.instance_21.alpha = 0;
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(60).to({_off:false},0).to({x:1469.05,y:539.15,alpha:1},7).to({_off:true},13).wait(20));

	// PIC
	this.instance_22 = new lib.Tween28("synched",0);
	this.instance_22.setTransform(2263.4,539.75);
	this.instance_22.alpha = 0;
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(60).to({_off:false},0).to({x:1791,y:541,alpha:1},7).to({startPosition:0},12).to({_off:true},1).wait(20));

	// BG
	this.instance_23 = new lib.BG();
	this.instance_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(60).to({_off:false},0).to({_off:true},20).wait(20));

	// UPSI_LOGO
	this.instance_24 = new lib.Symbol1("synched",0);
	this.instance_24.setTransform(983.15,207.7,0.0714,0.0714,0,0,0,508.1,285.9);
	this.instance_24.alpha = 0;
	this.instance_24._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(40).to({_off:false},0).to({regX:508.4,scaleX:0.4478,scaleY:0.4478,x:983.25,y:247.2,alpha:1},7).to({regX:508.2,scaleX:0.4688,scaleY:0.4688,x:983.2,y:265.55},3).to({_off:true},10).wait(40));

	// TOP_BORDER_copy
	this.instance_25 = new lib.Tween2("synched",0);
	this.instance_25.setTransform(0.05,-74.05,1,1,0,0,0,-958.2,0);
	this.instance_25.alpha = 0;
	this.instance_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(40).to({_off:false},0).to({scaleX:1.0112,y:76.45,alpha:1},7).to({startPosition:0},10).to({_off:true},3).wait(40));

	// INFO
	this.instance_26 = new lib.Tween11("synched",0);
	this.instance_26.setTransform(970.3,443.25,0.1216,0.1216);
	this.instance_26.alpha = 0;
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(40).to({_off:false},0).to({scaleX:1.0522,scaleY:1.0522,alpha:1},8).to({scaleX:1,scaleY:1},3).to({_off:true},9).wait(40));

	// TOP_BORDER
	this.instance_27 = new lib.Tween12("synched",0);
	this.instance_27.setTransform(960.25,542);
	this.instance_27.alpha = 0;
	this.instance_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(40).to({_off:false},0).to({alpha:1},6).to({_off:true},14).wait(40));

	// PIC
	this.instance_28 = new lib.UPSI_1("synched",0);
	this.instance_28.setTransform(960,944,1,1,0,0,0,960,540);
	this.instance_28.alpha = 0;
	this.instance_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(40).to({_off:false},0).to({alpha:0.75},8).to({_off:true},12).wait(40));

	// BG
	this.instance_29 = new lib.BG();

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(1,1,1).p("AgTovIAnAAIAARfIgnAAg");
	this.shape.setTransform(1134.3,288.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgTIwIAAxfIAnAAIAARfg");
	this.shape_1.setTransform(1134.3,288.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance_29}]},40).to({state:[]},20).wait(40));

	// TOP_BORDER
	this.instance_30 = new lib.Tween2("synched",0);
	this.instance_30.setTransform(0.05,-71.65,1,1,0,0,0,-958.2,0);
	this.instance_30.alpha = 0;
	this.instance_30._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(20).to({_off:false},0).to({scaleX:1.0157,y:76.45,alpha:1},10).to({startPosition:0},2).to({_off:true},8).wait(60));

	// INFO
	this.instance_31 = new lib.Tween8("synched",0);
	this.instance_31.setTransform(1846.65,821.45,0.6089,0.6089,0,0,0,0,0.1);
	this.instance_31.alpha = 0;
	this.instance_31._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(20).to({_off:false},0).to({x:1513.45,y:818.55,alpha:1},10).to({_off:true},10).wait(60));

	// KRU
	this.instance_32 = new lib.Tween7("synched",0);
	this.instance_32.setTransform(1784.45,323,1.3319,1.3319);
	this.instance_32.alpha = 0;
	this.instance_32._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(20).to({_off:false},0).to({x:1499.3,alpha:1},10).to({_off:true},10).wait(60));

	// TOP_BORDER
	this.instance_33 = new lib.Tween6("synched",0);
	this.instance_33.setTransform(2904.1,529.9,1,1.6075,0,0,0,0.1,0.1);
	this.instance_33.alpha = 0;
	this.instance_33._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(20).to({_off:false},0).to({x:2011.3,alpha:1},9).to({_off:true},11).wait(60));

	// PIC
	this.instance_34 = new lib.Tween10("synched",0);
	this.instance_34.setTransform(315.25,542.4);
	this.instance_34.alpha = 0;
	this.instance_34._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(20).to({_off:false},0).to({alpha:0.75},8).to({_off:true},12).wait(60));

	// BG
	this.instance_35 = new lib.BG();
	this.instance_35.setTransform(0,-2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,1).p("EiV4hUBMErxAAAMAAACoDMkrxAAAg");
	this.shape_2.setTransform(959.3,540.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2},{t:this.instance_35}]},20).to({state:[]},20).wait(60));

	// INTRO
	this.instance_36 = new lib.Tween5("synched",0);
	this.instance_36.setTransform(985.55,943.75);
	this.instance_36.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_36).to({startPosition:0},4).to({startPosition:0},7).to({y:803.5,alpha:1},5).to({_off:true},4).wait(80));

	// BOTTOM_BORDER
	this.instance_37 = new lib.Tween4("synched",0);
	this.instance_37.setTransform(959.25,1259.5);
	this.instance_37.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_37).to({y:848.5,alpha:1},11).to({startPosition:0},6).to({startPosition:0},1).to({_off:true},2).wait(80));

	// AHMAD_FAIERUZ
	this.instance_38 = new lib.Tween3("synched",0);
	this.instance_38.setTransform(523.3,77.25);
	this.instance_38.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_38).to({startPosition:0},4).to({startPosition:0},7).to({alpha:1},5).to({_off:true},4).wait(80));

	// TOP_BORDER
	this.instance_39 = new lib.Tween2("synched",0);
	this.instance_39.setTransform(958.25,-73.15);
	this.instance_39.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_39).to({scaleX:1.0198,y:74.05,alpha:1},11).to({scaleX:1.0219},3).to({scaleX:1.0248},4).to({_off:true},2).wait(80));

	// MAIN_PIC
	this.instance_40 = new lib.Tween1("synched",0);
	this.instance_40.setTransform(960,488);
	this.instance_40.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_40).to({startPosition:0},4).to({alpha:1},7).to({_off:true},9).wait(80));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(315.3,383.6,3574.1,1107.4);
// library properties:
lib.properties = {
	id: '5AFACB74DDE60148BA789AA68EB80996',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/_3DSMAXLOGO.png?1705906510877", id:"_3DSMAXLOGO"},
		{src:"images/AFTEREFFECTSLOGO.png?1705906510877", id:"AFTEREFFECTSLOGO"},
		{src:"images/BLENDERLOGO.png?1705906510877", id:"BLENDERLOGO"},
		{src:"images/COMDES.png?1705906510877", id:"COMDES"},
		{src:"images/BG.png?1705906510877", id:"BG"},
		{src:"images/KRUACADEMYLOGO.png?1705906510877", id:"KRUACADEMYLOGO"},
		{src:"images/KRUpngcopy.png?1705906510878", id:"KRUpngcopy"},
		{src:"images/ILLUSTRATORLOGO.png?1705906510878", id:"ILLUSTRATORLOGO"},
		{src:"images/ANIMATELOGO.png?1705906510878", id:"ANIMATELOGO"},
		{src:"images/UPSI.png?1705906510878", id:"UPSI"},
		{src:"images/FAIERUZMAIN.png?1705906510878", id:"FAIERUZMAIN"},
		{src:"images/PHOTOSHOPLOGO.png?1705906510878", id:"PHOTOSHOPLOGO"},
		{src:"images/LIGHTROOMLOGO.png?1705906510878", id:"LIGHTROOMLOGO"},
		{src:"images/faieruz3.png?1705906510878", id:"faieruz3"},
		{src:"images/PREMIEREPROLOGO.png?1705906510878", id:"PREMIEREPROLOGO"},
		{src:"images/TOONIGHTLOGO.png?1705906510878", id:"TOONIGHTLOGO"},
		{src:"images/UPSILOGO.png?1705906510878", id:"UPSILOGO"},
		{src:"images/TOONBOOMLOGO.png?1705906510878", id:"TOONBOOMLOGO"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['5AFACB74DDE60148BA789AA68EB80996'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;