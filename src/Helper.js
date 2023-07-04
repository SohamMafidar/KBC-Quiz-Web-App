export const collectAllOptions = async (data) => {
    const transformedDataArray = data.map((jsonData) => {
        const shuffledAnswers = [...jsonData.incorrectAnswers];
        shuffledAnswers.push(jsonData.correctAnswer);

        for (let i = shuffledAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledAnswers[i], shuffledAnswers[j]] = [
                shuffledAnswers[j],
                shuffledAnswers[i],
            ];
        }

        return {
            question: jsonData.question,
            answers: shuffledAnswers.map((text) => ({
                text,
                correct: text === jsonData.correctAnswer,
            })),
        };
    });

    return transformedDataArray;
};
