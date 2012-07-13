var curId = 0;
var curTypeId = 0;

var groups = [];
var groupColors = [];

function Unit (parentUnit) {
	this.id = curId++;
	if (parentUnit == null)
	{
		this.unitType = curTypeId++;
		this.color = get_random_color();
		this.x=get_random_int(0, 500);
		this.y=get_random_int(0, 400);
	}
	else
	{
		this.unitType = parentUnit.unitType;
		this.color = parentUnit.color;
		this.x = parentUnit.x;
		this.y = parentUnit.y;
	}

	this.size = get_random_int(1, 5);
	this.ticks = 0;
	this.lifespan = get_random_int(1, 6000);
    

	//add this Unit to group
	if (groups[this.unitType] == null)
		groups[this.unitType] = 1;
	else
	{
		groups[this.unitType] = groups[this.unitType] + 1;
	}
	groupColors[this.unitType] = this.color;

	function UnitOutput(parent)
	{
		this.duplicate = (get_random_int(0, 2000) == 1);
		this.die = (parent.ticks > parent.lifespan);
		//log(parent, 'test: ' + parent.ticks + ' / ' + parent.lifespan)
	}

	this.process = function (context)
	{
		this.ticks++;
		var output = new UnitOutput(this);
		this.draw(context);
		return output;
	}

	this.draw = function (context)
	{
		context.beginPath();
		context.fillStyle=this.color;
		// Draws a circle of radius 20 at the coordinates 100,100 on the canvas
		context.arc(this.x,this.y,this.size,0,Math.PI*2,true);
		context.closePath();
		context.fill();
		
		// Boundary Logic
		if (get_random_int(0, 20) == 1)
		{
			var dx=get_random_int(-5, 5);
			var dy=get_random_int(-5, 5);

			if(!((this.x<=0 && dx < 0)  
				|| (this.x>=500 && dx > 0) 
				|| (this.y<=0 && dy < 0) 
				|| (this.y>=400 && dy > 0)))
			{
				this.x+=dx;
				this.y+=dy;
			}
		}
	}
}

function get_random_int (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}