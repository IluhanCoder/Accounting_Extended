export default new class StringHelper {
    unstrictCompare(stringA: string, stringB: string) {
        return stringA.toUpperCase().includes(stringB.toUpperCase());
    }
}