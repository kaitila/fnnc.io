interface Alpha {
    apiKey: string,
}

class Alpha {
    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }
}

export const alpha = new Alpha(process.env.TEST_API_KEY!);