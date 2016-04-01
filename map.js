var map = [
["#0ff","#ff0","#0f0","#0ff","#0f0","#0f0","#f0f","#0f0","#0f0","#fff","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#fff"],
["#0ff","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0ff","#fff","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0ff","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#ff0","#0f0","#0f0","#0f0","#0f0","#0aa","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#ff0","#0f0","#ff0","#0ff","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#f0f","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#f0f","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#f0f","#f0f","#0ff","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#f0f","#f0f","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#ff0","#0f0","#0f0","#0f0","#0f0","#fff","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#ff0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0ff","#ff0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#ba0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#800","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#fff","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#fff","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#b0b","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#fff"],
["#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"],
["#0f0","#0f0","#0f0","#fff","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0","#0f0"]
];