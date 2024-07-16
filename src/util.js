export class Util {
    static whichCorner(prevDirection, newDirection) {
        if (prevDirection.x === newDirection.x && prevDirection.y === newDirection.y)
            return null
        else {
            if (prevDirection.x === -1) {
                if (newDirection.y === -1) 
                    return 'bottomleft'
                else 
                    return 'topleft'
            }
            else if (prevDirection.x === 1) {
                if (newDirection.y === -1)
                    return 'bottomright'
                else 
                    return 'topright'
            }
            else if (prevDirection.y === -1) {
                if (newDirection.x === -1)
                    return 'topright'
                else 
                    return 'topleft'
            }
            else if(prevDirection.y === 1) {
                if (newDirection.x === - 1)
                    return 'bottomright'
                else
                    return 'bottomleft'
            }
            else
                return null
        }
    }
}