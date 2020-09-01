# poke-jump-part-1

Part of a little game I am coding

# New Code Explained:

### This is the main script:
` 
if (xPos + 80 > pipes.x && xPos + 40 < (pipes.x + pipes.w) && yPos > 700 - pipes.h) {
     console.log("Collision with Pipe!");
     state.current = state.over;
   }
`

### I'll explain each piece.

`xPos + 80 > pipes.x`

This takes the x of pikachu and adds 80 (pikachu's width) then compares it to the x of the pipe. If the pipe's x is less than `xPos + 80`, then Pikachu is "inside" of the pipe.
But, this means we can't jump over the pipe, because this script doesn't care about the y value. So, I added this:

`yPos > 700 - pipes.h`

This just takes the y and determines if if clears the pipe or not. 700 is the height of the canvas. But there's still a problem, if you jump over the pipe, you can still fall through the top of the pipe. So I added this:

`xPos + 40 < (pipes.x + pipes.w)`

This makes an imaginary line in the middle of pikachu, and if it touches the right side of the pipe, it triggers the event.  
