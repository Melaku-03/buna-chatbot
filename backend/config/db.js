import { connect } from "mongoose";

const db = async function () {
    try {
        await connect(process.env.DATABASE_URI)
            .then(res => console.log("DB connected!"))
    } catch (error) {
        console.log(error.message);
    }
}

export default db;
