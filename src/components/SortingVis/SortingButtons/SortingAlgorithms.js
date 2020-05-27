export function bubbleSortAnimations(input) {
        let bubbleAnimation = []
        let length = input.length
        let isSwapped
        do {
                isSwapped = false;
                for (let i = 0; i < length-1; i++) {
                        if (input[i] > input[i + 1]) { 
                                //Pushes indices to bubbleAnimation to change the color indicating 
                                //the bars are being checked 
                                bubbleAnimation.push([i, i+1, 'color', 'change'])
                                //Pushes indices to bubbleAnimation to revert the color 
                                bubbleAnimation.push([i, i+1, 'color', 'revert'])  
                                //Pushes indices to bubbleAnimation to change the height of 
                                //the array bars
                                bubbleAnimation.push([i, i+1, 'height'])
                                let temp = input[i]
                                input[i] = input[i + 1]
                                input[i + 1] = temp
                                isSwapped = true
                        }
                }
        } while (isSwapped)
        return bubbleAnimation
};

export function insertionSortAnimations(input) {
        let insertionAnimation = []
        let length = input.length;
        for (let i = 1; i < length; i++) {
                let value = input[i];
                let j = i - 1;
                while (j >= 0 && input[j] > value) {
                        //Pushes indices to insertionAnimation to change the color
                        insertionAnimation.push([j, j+1, 'color', 'change']);
                        //Pushes indices to insertionAnimation to revert the color
                        insertionAnimation.push([j, j+1, 'color', 'revert']);
                        //Pushes indices to insertionAnimation to swap array bars
                        insertionAnimation.push([j, j+1, 'height']);
                        input[j + 1] = input[j];
                        j--;
                }
                input[j + 1] = value;
        }
        return insertionAnimation
}

export function heapSortAnimations(input) {
        let heapAnimation = []
        for (let i = Math.floor(input.length / 2 - 1); i >= 0; i--) {
                heapify(input, input.length, i, heapAnimation);        
        }
        for (let i = input.length - 1; i >= 0; i--) {
                
                heapSwap(input, 0, i, heapAnimation);
                heapify(input, i, 0, heapAnimation); 
        }
        return heapAnimation
}

//heapify function
//Does: Creates and maintains the heap. Also pushes animations to the 
//      heapAnimation array when necessary
function heapify(input, size, i, heapAnimation) {
        let max = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        if (left < size && input[left] > input[max]) {
                max = left;
        }
        if (right < size && input[right] > input[max]) {
                max = right;
        }

        //Pushes indices to the heapAnimation array to change color
        heapAnimation.push([i, max, 'color', 'change']);
        //Pushes indices to the heapAniamtion array to revert color 
        heapAnimation.push([i, max, 'color', 'revert']);

        if (max !== i) {
                heapSwap(input, i, max, heapAnimation);
                heapify(input, size, max, heapAnimation);       
        }
}

//heapSwap function
//Does: Swaps the values stored at the given indices in the input 
//      array
function heapSwap(input, first, second, heapAnimation) {
        //Pushes indices to the heapAnimation array to swap array bars 
        heapAnimation.push([first, second, 'height']);
        let temp = input[first];
        input[first] = input[second];
        input[second] = temp;
}


export function mergeSortAnimations(array) {
        let tempArray = Array.from(array);
        let mergeAnimation = []
        mergeSortHelper(array, 0, array.length - 1, tempArray, mergeAnimation);
        return mergeAnimation
}

//mergeSortRecur function
//Does: Recursive merge sort helper function
function mergeSortHelper(input, startIndex, endIndex, tempArray, mergeAnimation) {
        if (startIndex === endIndex) {
                return;
        }
        let middleIndex = Math.floor((startIndex + endIndex) / 2);
        mergeSortHelper(tempArray, startIndex, middleIndex, input, mergeAnimation);
        mergeSortHelper(tempArray, middleIndex + 1, endIndex, input, mergeAnimation);
        mergeSortHelp(input, startIndex, middleIndex, endIndex, tempArray, mergeAnimation);
}

//mergeSortHelp function
//Does: Performs an iterative merge sort on a portion of the array and 
//      pushes animations to the mergeAnimations array
function mergeSortHelp(input, startIndex, middleIndex, endIndex, tempArray, mergeAnimation) {
        let x = startIndex, y = startIndex, z = middleIndex + 1;
        while (y <= middleIndex && z <= endIndex) {
                //Pushes indices to the mergeAnimation array to change color
                mergeAnimation.push([y, z, 'color', 'change']);
                //Pushes indices to the mergeAnimation array to revert color
                mergeAnimation.push([y, z, 'color', 'revert']);
                if (tempArray[y] <= tempArray[z]) {
                        //Pushes indices to the mergeAnimation array to swap array bars 
                        mergeAnimation.push([x, tempArray[y], 'height']);
                        input[x++] = tempArray[y++];
                } else {
                        //Pushes indices to the mergeAnimation array to swap array bars 
                        mergeAnimation.push([x, tempArray[z], 'height']);
                        input[x++] = tempArray[z++];
                }
        }
        while (y <= middleIndex) {
                //Pushes indices to the mergeAnimation array to change color
                mergeAnimation.push([y, y, 'color', 'change']);
                //Pushes indices to the mergeAnimation array to revert color
                mergeAnimation.push([y, y, 'color', 'revert']);
                //Pushes indices to the mergeAnimation array to swap array bars 
                mergeAnimation.push([x, tempArray[y], 'height']);
                input[x++] = tempArray[y++];
        }
        while (z <= endIndex) {
                //Pushes indices to the mergeAnimation array to change color
                mergeAnimation.push([z, z, 'color', 'change']);
                //Pushes indices to the mergeAnimation array to revert color
                mergeAnimation.push([z, z, 'color', 'revert']);
                //Pushes indices to the mergeAnimation array to swap array bars 
                mergeAnimation.push([x, tempArray[z], 'height']);
                input[x++] = tempArray[z++];
        }
}

export function selectionSortAnimations(input) {
        let selectionAnimation = []
        let length = input.length;
        for (let i = 0; i < length; i++) {
                let minimum = i;
                for (let j = i + 1; j < length; j++) {
                        //Pushes indices to the selectionAnimation array to change colors
                        selectionAnimation.push([j, minimum, 'color', 'change']);
                        //Pushes indices to the selectionAnimation array to revert colors
                        selectionAnimation.push([j, minimum, 'color', 'revert']);
                        if (input[minimum] > input[j]) {
                                minimum = j;
                        }
                }
                if (minimum !== i) {
                        //Pushes indices to the selectionAnimation array to swap array bars
                        selectionAnimation.push([i, minimum, 'height']);
                        let temp = input[i];
                        input[i] = input[minimum];
                        input[minimum] = temp;
                }
        }
        return selectionAnimation
}