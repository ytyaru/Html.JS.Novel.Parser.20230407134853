window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOMContentLoaded!!');
    const res = await fetch(`md/test.md`)
    document.getElementById('content').innerHTML = noveld.parse(await res.text())
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

