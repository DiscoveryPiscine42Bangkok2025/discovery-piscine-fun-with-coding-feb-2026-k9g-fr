const ft_list = document.getElementById('ft_list');
const new_btn = document.getElementById('new_btn');

// โหลดข้อมูลจาก Cookie เมื่อเปิดเบราว์เซอร์
window.onload = () => {
    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(row => row.startsWith('todos='));
    if (todoCookie) {
        const todos = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
        // แสดงผลจากล่างขึ้นบนเพื่อให้รายการใหม่ล่าสุดอยู่บนสุดเสมอ
        todos.reverse().forEach(text => addToDOM(text));
    }
};

// เมื่อคลิกปุ่ม 'New' ให้เปิด prompt
new_btn.addEventListener('click', () => {
    const task = prompt("เพิ่มรายการใหม่ของคุณ:");
    if (task && task.trim() !== "") {
        addToDOM(task);
        saveTodos();
    }
});

function addToDOM(text) {
    const div = document.createElement('div');
    div.className = 'todo-item';
    div.textContent = text;
    
    // เมื่อคลิกที่รายการเพื่อลบ
    div.addEventListener('click', () => {
        if (confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) {
            div.remove(); // ลบออกจาก DOM ถาวร
            saveTodos();
        }
    });

    // เพิ่มไว้ที่ส่วนบนสุดของรายการ (Top of the list)
    ft_list.insertBefore(div, ft_list.firstChild);
}

// ฟังก์ชันบันทึกรายการลงใน Cookie
function saveTodos() {
    const items = Array.from(document.querySelectorAll('.todo-item'))
                       .map(item => item.textContent);
    // ตั้งค่าวันหมดอายุให้ Cookie นานๆ
    document.cookie = `todos=${encodeURIComponent(JSON.stringify(items))}; path=/; max-age=31536000`;
}