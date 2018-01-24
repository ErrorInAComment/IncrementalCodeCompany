/*
 * Incremental Code Company
 *
 * Made by ErrorInAComment
 * Released under the GNU General Public License v3.0
 */

class Graph
{
    /**
     * Create a graph object that uses a canvas to draw a graph
     * @param canvas Canvas element
     * @param max Max value for nodes
     * @param steps Amount of nodes to show at once
     * @param nodes Array of values to create initial nodes from
     */
    constructor(canvas, max, steps, nodes = [])
    {
        this.canvas = canvas;
        this.max = max;
        this.steps = steps;
        this.nodes = nodes;
    }

    /**
     * Add a node to the graph
     * @param value
     */
    addNode(value)
    {
        // Add value to nodes
        this.nodes.push(value);

        // Drop oldest node if there is more than necessary
        if(this.nodes.length > this.steps)
        {
            this.nodes = this.nodes.slice(1, this.nodes.length);
        }
    }

    /**
     * Draw the graph
     */
    draw()
    {
        // Skip unnecessary draw calls if there is no nodes
        if(this.nodes.length == 0)
            return;

        // Calculate length per step
        var stepLength = (this.canvas.width - 40) / (this.steps - 1); // Steps - 1 because 3 nodes only create 2 lines

        // Calculate height per 'value'
        var valueHeight = this.canvas.height / this.max;

        // Get context
        let ctx = this.canvas.getContext("2d");

        // Clear canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Prepare to draw the graph
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#3498db";

        let x;
        let y;
        let value;

        // Loop trough the nodes
        for(let i = 0; i < this.nodes.length; i++)
        {
            value = this.nodes[i];

            // Calculate x and y coords and make sure it's an integer (pixel perfect)
            x = Math.floor(i * stepLength) + 20;
            y = this.canvas.height - Math.floor(value * valueHeight);

            // If first node, move to start pos, otherwise just draw line to the node
            if(i == 0)
                ctx.moveTo(x, y);
            else
                ctx.lineTo(x, y);
        }

        // End drawing of the graph
        ctx.stroke();

        // Draw flat line at current value
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "#666";
        ctx.moveTo(20, y + 0.5);
        ctx.lineTo(this.canvas.width, y + 0.5);
        ctx.stroke();

        // Draw labels indicating min and max value
        ctx.font = "10px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "left";
        ctx.fillText("$" + this.max, 2, 12);
        ctx.fillText("$0", 2, this.canvas.height - 2);

        // Draw label for current value
        let yLabel = y - 3;
        if(y < this.canvas.height / 2)
            yLabel = y + 10;

        ctx.font = "10px Arial";
        ctx.fillStyle = "#000";
        ctx.textAlign = "right";
        ctx.fillText("$" + Math.floor(value), this.canvas.width - 2, yLabel);
    }
}