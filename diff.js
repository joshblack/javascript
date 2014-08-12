function diff(original, updated) {

    // So we filter the original array...
    return [].filter.call(original, function(value, index) {

        // Check and see if the current value is not equal to what we have in our updated DOM
        if (value !== updated[index]) {

            // If it is, we need to shift our indexes so that we can keep making valid comparisons
            updated.unshift(null);

            // We need to return this diff node in the new array
            return true;
        }

        // Otherwise we have the same node
        return false;
    });
}




function diff(original, updated) {
    var updatedNotes = [];

    return [].forEach.call(original, function(value, index) {
        if (value !== updated[index]) {
            (~updated.indexOf(value))
                ? value.dom_state = 'addition'
                : value.dom_state = 'deleted';

            updatedNodes.push(value)
        }

        return false;
    });
}

function diff(original, updated) {
    var updatedNodes = [];

    return [].forEach.call(updated, function(value, index) {
        if (value !== original[index]) {

            if (original.indexOf(value)) {
                // Then we know that this is a deletion

            } else {
                // Then we know that this value was added
            }

        }
    });
}

function diff(original, updated) {

    var count = 0;

    return [].filter.call(updated, function(value, index) {

        // Check to see if the current value equals the corresponding position in the original
        // DOM Node Collection
        if (value !== original[count]) {

            if (updated.indexOf(original[count])) {
                // This current value is just an addition
            } else {
                // The value in original has been removed, increment where we are looking at
                // in original
                count++;

            }
        }

        // We have a match, increment the point of comparison in the original DOM Node 
        // Collection and don't add it to the list of effected nodes.
        count++;
        return false;
    });
}

// Takes in two node lists, i.e:
// var orig = document.getElementsByTagName('*');   -> original DOM Tree
// var update = document.getElementsByTagName('*'); -> updated DOM Tree
// diff(orig, update); -> should return the affected nodes (deleted or added)
function diff(original, updated) {

    // Create arrays from our two node lists.
    var originalList = [].slice.call(original, 0),
        updatedList = [].slice.call(updated, 0),

        // Collection for our updated nodes
        updatedNodes = [],

        // Count to keep track of where we are looking at in the original DOM Tree
        count = 0,

        // Loop Counter
        i;

    // Go through all the nodes in our updated DOM Tree
    for (i = 0; i < updatedList.length; i++) {

        // Check for a mismatch in values
        if (updatedList[i] !== originalList[count]) {

            // Check if the value ever exists in our updated list
            if (updatedList.indexOf(originalList[count]) !== -1) {
                // The item exists somewhere in our updated list, we'll get there
                // eventually. For now just push up the additions we have until we get
                // to the node that exists in the original DOM Tree.
                updatedNodes.push(updatedList[i]);

            } else {
                // The node does not exist in our updated list, it has been deleted.
                // Need to increment our counter that we are using for original list
                // and redo the current iteration against the new position. Also, add
                // the deleted node to our list of affected nodes.
                updatedNodes.push(originalList[count]);
                count++;
                i--;
            }

        } else {
            // The value was found! Time to check the next ones.
            count++;           
        }
    }

    return updatedNodes;
}