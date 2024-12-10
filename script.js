// صفحة تسجيل الدخول
function login() {
    const code = document.getElementById("loginCode").value;
    if (code === "TIK-SoFe-Q01") { // كود الدخول
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("mainContainer").style.display = "block";
    } else {
        alert("Invalid access code!");
    }
}

// مولد أسماء المستخدمين (4 أو 5 أحرف فقط)
function generateUsername() {
    const chars = "1234567890abcdefghijklmnopqrstuvwxyz";
    const length = Math.random() < 0.5 ? 4 : 5; // اختيار عشوائي بين 4 أو 5 أحرف
    let username = "";
    for (let i = 0; i < length; i++) {
        username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return username;
}

// التحقق من اسم المستخدم على تيك توك
async function checkUsername(username) {
    const output = document.getElementById("output");
    const url = `https://www.tiktok.com/@${username}`;
    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 8.0.0; Plume L2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.88 Mobile Safari/537.36",
            },
        });

        if (response.status === 404) {
            output.innerHTML += `<p class="good">Available Username: ${username}</p>`;
        } else {
            output.innerHTML += `<p class="bad">Taken Username: ${username}</p>`;
        }
    } catch (error) {
        output.innerHTML += `<p class="bad">Error checking: ${username}</p>`;
    }
}

// بدء عملية التحقق المستمرة
function startChecking() {
    const output = document.getElementById("output");
    output.innerHTML = "<p>Starting...</p>";

    // عملية مستمرة طالما المستخدم في الصفحة
    setInterval(() => {
        const username = generateUsername();
        checkUsername(username);
    }, 1000); // تحقق من اسم مستخدم جديد كل ثانية
}
