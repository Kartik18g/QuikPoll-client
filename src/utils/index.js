export const toPercent = (a,b)=> {
    return isNaN(((a/b)*100).toFixed(0))?0 + "%":((a/b)*100).toFixed(0)+"%";
}