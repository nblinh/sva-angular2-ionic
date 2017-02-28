export class Terrain {
    constructor(
	    readonly name : string, 
	    readonly description : string,
	    readonly roadSign : string,
	    readonly landes: number[],
	    readonly oneway : string,
	    readonly maxspeed: number[], 
	    readonly filename : string
    ) {} 
}