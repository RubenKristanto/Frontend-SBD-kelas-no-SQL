import { useNavigate } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert2";
import axios from "axios";

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
        console.log(email, password);

        // Validasi input kosong
        if (!email && !password) {
            await swal.fire({
            icon: "error",
            iconColor: "#FFFFFF",
            text: "Silahkan masukkan email dan password terlebih dahulu",
            color: "#FFFFFF",
            background: "#303655",
            });
            return;
        } else if (!email) {
            await swal.fire({
            icon: "error",
            iconColor: "#FFFFFF",
            text: "Silahkan masukkan email terlebih dahulu",
            color: "#FFFFFF",
            background: "#303655",
            });
            return;
        } else if (!password) {
            await swal.fire({
            icon: "error",
            iconColor: "#FFFFFF",
            text: "Silahkan masukkan password terlebih dahulu",
            color: "#FFFFFF",
            background: "#303655",
            });
            return;
        }

        // Kirim permintaan login ke backend
        const response = await axios.post("https://localhost:5000/user/login", {
            email: this.email,
            password: this.password,
        });

        // Jika login berhasil
        if (response.status === 200) {
            const userId = response.data.payload.id;
            localStorage.setItem("id", userId); // Simpan email ke localStorage

            await swal.fire({
            icon: "success",
            iconColor: "#FFFFFF",
            text: "Login Berhasil",
            color: "#FFFFFF",
            background: "#303655",
            });

            navigate("/home");
        }
        } catch (error) {
        console.error("Error:", error);

        if (error.response && error.response.status === 400) {
            await swal.fire({
            icon: "error",
            iconColor: "#FFFFFF",
            text: "Email atau password salah",
            color: "#FFFFFF",
            background: "#303655",
            });
        } else if (error.response && error.response.data.message) {
            await swal.fire({
            icon: "error",
            iconColor: "#FFFFFF",
            text: error.response.data.message,
            color: "#FFFFFF",
            background: "#303655",
            });
        } else {
            await swal.fire({
            icon: "error",
            iconColor: "#FFFFFF",
            text: "Terjadi kesalahan, silakan coba lagi",
            color: "#FFFFFF",
            background: "#303655",
            });
        }
        }
    };

    return(
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-blue-950">
            
            <div className="w-[40%] h-[80%] bg-white rounded-3xl shadow-lg flex-col flex items-center justify-center bg-gradient-to-b from-sky-700 to-blue-900">
            <p className="text-3xl font-bold text-white pb-2">Login</p>
            <div className="w-[85%] h-[80%] flex flex-col items-center justify-center bg-white rounded-3xl opacity-75">
                <p className="text-black self-start mb-2 pl-6">Email</p>
                <div className="w-full max-w-sm min-w-[200px] px-3">
                <div className="relative">
                    <input
                    className="peer w-full bg-transparent placeholder:text-slate-400 text-black text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-black text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
                    Email
                    </label>
                </div>
                </div>

                <p className="text-black self-start mt-8 mb-2 pl-6">Password</p>    
                <div className="w-full max-w-sm min-w-[250px] px-3">
                <div className="relative">
                    <input
                    className="peer w-full bg-transparent placeholder:text-slate-400 text-black text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    />
                    <label className="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-black text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
                    Password
                    </label>
                </div>
                </div>

                <button
                className="bg-blue-800 hover:font-bold hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-8 shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleLogin}
                >
                <p className="text-white font-bold">Login</p>
                </button>
            </div>

            <div className="flex">
                <p className="text-white text-center pr-6">Doesn't have account?</p>
                <p
                className="text-white underline text-center hover:font-bold cursor-pointer"
                onClick={() => navigate("/register")}
                >
                Register Now
                </p>
            </div>
            </div>
        </div>
    )

}