class Activity {
    createActivityRow = () => {
        let originalActivityRow = document.querySelector('.row');

        originalActivityRow.addEventListener('dragstart', () => {
            originalActivityRow.classList.add('dragging');
        });
        originalActivityRow.addEventListener('dragend', () => {
            originalActivityRow.classList.remove('dragging');
        });
        let deleteButton = originalActivityRow.querySelector('.delete-activity-button');
        deleteButton.addEventListener('click', this.deleteActivityRow);

        let clonedActivityRow = this.cloneActivityRow(originalActivityRow);
    }

    cloneActivityRow = (original) => {
        let clone = original.cloneNode(true);
        clone.addEventListener('dragstart', () => {
            clone.classList.add('dragging');
        });
        clone.addEventListener('dragend', () => {
            clone.classList.remove('dragging');
        });
        let deleteButtonCloned = clone.querySelector('.delete-activity-button');
        deleteButtonCloned.addEventListener('click', this.deleteActivityRow);
        clone.querySelector(".activity-text").value = "";
        document.querySelector('.row-container').appendChild(clone);
        return clone;
    }

    deleteActivityRow = (e) => {
        let rows = document.querySelectorAll('.row');
        if (rows.length > 1) {
            if (!e.target.parentNode.classList.contains("row")) { e.target.parentNode.parentNode.remove(); }
            else e.target.parentNode.remove();
        }
    }

}

class Sorting {
    sortActivities = () => {
        let sortingButton = document.querySelector('#sorting');
        sortingButton.addEventListener('click', this.doSort);
    }

    doSort = () => {
        let rows = document.querySelectorAll('.row');
        let sortAsc = document.getElementById('ascending');
        let sortDesc = document.getElementById('descending');
        if (sortDesc.classList.contains('changeSort')) {
            this.sortDescending(rows, sortAsc, sortDesc);
        } else this.sortAscending(rows, sortAsc, sortDesc);
    }

    sortDescending = (rows, sortAsc, sortDesc) => {
        let elArr = Array.from(rows).sort(function (a, b) {
            if (a.querySelector('.activity-text').value < b.querySelector('.activity-text').value) return -1;
            if (a.querySelector('.activity-text').value > b.querySelector('.activity-text').value) return 1;
            return 0;
        });
        elArr.forEach(element => {
            document.querySelector(".row-container").appendChild(element)
        });
        sortDesc.classList.toggle('changeSort');
        sortAsc.classList.toggle('changeSort');
    }

    sortAscending = (rows, sortAsc, sortDesc) => {
        let elArr = Array.from(rows).sort(function (a, b) {
            if (a.querySelector('.activity-text').value > b.querySelector('.activity-text').value) return -1;
            if (a.querySelector('.activity-text').value < b.querySelector('.activity-text').value) return 1;
            return 0;
        });
        elArr.forEach(element => {
            document.querySelector(".row-container").appendChild(element)
        });
        sortDesc.classList.toggle('changeSort');
        sortAsc.classList.toggle('changeSort');
    }
}

class Dragging {
    drag = () => {
        const container = document.querySelector('.row-container');
        container.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = this.getDragAfterElement(container, e.clientY);
            const draggable = document.querySelector('.dragging');
            if (afterElement == null) {
                container.appendChild(draggable);
            } else {
                container.insertBefore(draggable, afterElement);
            }
        });
    }

    getDragAfterElement = (container, y) => {
        const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            } else {
                return closest
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

}

class Main {
    run = ()=>{
        let activity = new Activity();
        let sorting = new Sorting();
        let dragging = new Dragging();
        let addButton = document.querySelector('.add-button');
        addButton.addEventListener('click', activity.createActivityRow);
        sorting.sortActivities();
        dragging.drag();
    }
}

let main = new Main();
main.run();


