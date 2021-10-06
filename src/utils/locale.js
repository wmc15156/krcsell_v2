const localeLangsUtil = (text) => {
    let result;
    switch (text) {
        case 'Korean':
            result = 'ko';
            break;
        case 'English':
            result = 'en';
            break;
    }
    console.log(result);
    return result;
};

export { localeLangsUtil };
