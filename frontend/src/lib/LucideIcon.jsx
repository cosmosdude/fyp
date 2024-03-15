
import { icons } from "lucide-react";

/**
 * LucideIcon renderer
 * 
 * @param name Icon name. If icon name is "circle-dashed", it becomes "CircleDashed".
 * @param color Icon color.
 * @param size Icon size.
*/
export default function LucideIcon({name, color, size}) {
    let Icon = icons[name]; // get dynamic icon
    console.log("Icon Name", name)
    if (!Icon) {
        console.log("Icon not found:", name)
        // 
        let combined = name.split('-') // "circle-dashed" => ["circle", "dashed"]
            .filter(x => x) // remove empty parts
            .map(x => {  // capitalize
                return x.substring(0, 0) + x.charAt(0).toUpperCase() + x.substring(1)
            })
            .join('') // rejoin
        console.log("Icon Name", combined)
        Icon = icons[combined]
    }
    // if failed, fallback to dashed circle icon
    if (!Icon) Icon = icons["CircleDashed"]
    // return the icon as jsx
    return <Icon color={color} size={size} />;
}