const getRoot = () => document.getElementById('root')
const getInputValue = () => document.querySelector('.input')?.value;
const getColumn = (columnNumber) =>  document.querySelectorAll('.column')[columnNumber];
const getAllColumns = () => document.querySelectorAll('.column');

const createField = () => {
    const root = getRoot()
    const field = document.createElement('div');
    field.className = 'field';

    root.append(field);
    return field
}

const createColumns = (parent, number) => {
    const createOneColumn = () => {
        const column = document.createElement('div');
        column.className = 'column';

        return column
    }
    const iterator = [];
    iterator.length = number;

    for (let num of iterator) {
        parent.appendChild(createOneColumn())
    }
}

const createButton = (parent, textInside, className, clickFunction) => {
    const button = document.createElement('button');
    button.innerText = textInside;
    button.className = className;
    button.addEventListener('click', clickFunction);

    parent.appendChild(button);
    return button;
}

const createInput = (parent, type, className) => {
    const input = document.createElement('input');
    input.type = type;
    input.className = className;

    parent.appendChild(input);
    return input;
}

const changeCardNode = (card) => {
 const cardCoordinates = parseInt(card.style.left);
 const accuracy = 15;

 const columns = getAllColumns();

 //-1 because i am very tired and don't know how to resolve it
 let columnsCounter = -1;

 for (let column of columns) {
     const columnCoordinates = column.getBoundingClientRect().x;
     if (cardCoordinates + accuracy > columnCoordinates) {
        columnsCounter++;
     }
 }

 const resolvedColumn = columns[columnsCounter];
 resolvedColumn.appendChild(card);

 //change card coords to the new column
 card.style.left = `${resolvedColumn.getBoundingClientRect().x}px`;
 card.style.top = `${resolvedColumn.getBoundingClientRect().y}px`
}

const dragFunction = (card) => {

    const changeCardX = (clientX) => card.style.left = `${Math.round(clientX / 25) * 25 - 50}px`;
    const changeCardY = (clientY) => card.style.top = `${Math.round(clientY / 25) * 25 - 50}px`;

    const moveBrick = (event) => {
        changeCardX(event.clientX);
        changeCardY(event.clientY);

    }

        card?.addEventListener('mousedown', () => {
            document.addEventListener('mousemove', moveBrick)
            card.className = 'card cardMoving';


            console.log(card.style.left)

        })

        card?.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', moveBrick)
            card.className = 'card';

            // release card
            changeCardNode(card)
        })

}

const createCard = (parent, text, className) => {
    const card = document.createElement('div');
    card.innerText = text;
    card.className = className;

    // // makes default values for the future calculations
    card.style.left = `${card.getBoundingClientRect().x}px`
    card.style.top = `${card.getBoundingClientRect().y}px`

    parent.appendChild(card);
    dragFunction(card)
    return card;
}

// holly crap
// Probably there is another way to do this
createColumns(createField(),3);
createInput(getRoot(),'text', 'input')
createButton(getRoot(),
    'Создать карточку',
    'createCardButton',
    () => createCard(getColumn(0),
        getInputValue(),
        `card`));

