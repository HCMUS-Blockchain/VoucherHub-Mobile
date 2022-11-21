const findExtension = (filename) => {
    for (let i = filename.length - 1; i >= 0; i--) {
        if (filename[i] === '.') {
            return filename.slice(i + 1);
        }
    }
}

export default findExtension;
