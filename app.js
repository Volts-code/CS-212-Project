const searchInput = document.querySelector('#search');

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const searchTerm = searchInput.value.toLowerCase().trim();

        const allTitles = document.querySelectorAll('.book-title');
        let bookFound = false;

        allTitles.forEach(titleElement => {
            if (titleElement.textContent.toLowerCase() === searchTerm) {
                bookFound = true;

                alert(`"${searchInput.value}" was found in our library!`);

                titleElement.closest('.card').style.border = "5px solid green";
            }
        });

        if (!bookFound) {
            alert(`"${searchInput.value}" was not found in our library.`);
        }
     }
});

const borrowButtons = document.querySelectorAll('.card button');

borrowButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const clickedButton = event.target;

        const card = clickedButton.closest('.card');
        const bookTitle = card.querySelector('.book-title').textContent;
        const statusTag = card.querySelector('.tag:last-of-type');

        const startDate = new Date();
        const borrowPeriod = 14;

        if (clickedButton.textContent === "Borrowed"){
            statusTag.textContent = "Status: Available";
            clickedButton.textContent = "Borrow";

            alert(`You returned: ${bookTitle} `);

            updateDashboard();
            return;
        }

        statusTag.textContent = `Status: Due in ${borrowPeriod} days`;
        clickedButton.textContent = "Borrowed";

        alert(`You borrowed: ${bookTitle} on ${startDate.toLocaleDateString()}`);
        
        updateDashboard();
    });
});


function updateDashboard() {
    const totalSpan = document.getElementById('totalBooks');
    const borrowedSpan = document.getElementById('borrowedBooks');
    const overdueSpan = document.getElementById('overdueBooks');

    if (!totalSpan || !borrowedSpan || !overdueSpan){
        return;
    }

    const totalCount = document.querySelectorAll('.card').length;

    const borrowedCount = Array.from(document.querySelectorAll('.tag')).filter(tag => 
        tag.textContent.includes('Status: Due in') || tag.textContent.includes('Borrowed')
    ).length;

    const overdueCount = Array.from(document.querySelectorAll('.tag')).filter(tag => {
        const text = tag.textContent;
        if (text.includes('days left')) {
            const days = parseInt(text.match(/\d+/));
            return days <= 0;
        }
        return false;
    }).length

    totalSpan.textContent = totalCount;
    borrowedSpan.textContent = borrowedCount;
    overdueSpan.textContent = overdueCount;
}

updateDashboard();

const homeSearch = document.querySelector(".front-page #search");

if (homeSearch) {
    homeSearch.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            window.location.href = "books.html";
        }
    });
}



document.addEventListener("DOMContentLoaded", function () {

    const sortBar = document.getElementById("sort");
    const booksContainer = document.getElementById("books");

    if (!sortBar || !booksContainer) return;

    const originalBooks = Array.from(booksContainer.querySelectorAll(".card"));

    sortBar.addEventListener("change", function () {

        const books = Array.from(booksContainer.querySelectorAll(".card"));

        if (this.value === "") {
            booksContainer.innerHTML = "";

            originalBooks.forEach(book => {
                booksContainer.appendChild(book);
            });

            return;
        }

        if (this.value === "title") {

            books.sort((a, b) => {
                const titleA = a.querySelector(".book-title").textContent.trim().toLowerCase();
                const titleB = b.querySelector(".book-title").textContent.trim().toLowerCase();

                return titleA.localeCompare(titleB);
            });

        }



        if (this.value === "author") {

            books.sort((a, b) => {
                const authorA = Array.from(a.querySelectorAll("p"))
                    .find(p => p.textContent.includes("Author:"))
                    .textContent.replace("Author:", "")
                    .trim()
                    .toLowerCase();

                const authorB = Array.from(b.querySelectorAll("p"))
                    .find(p => p.textContent.includes("Author:"))
                    .textContent.replace("Author:", "")
                    .trim()
                    .toLowerCase();

                return authorA.localeCompare(authorB);
            });

        }

        booksContainer.innerHTML = "";

        books.forEach(book => {
            booksContainer.appendChild(book);
        });

    });

});
