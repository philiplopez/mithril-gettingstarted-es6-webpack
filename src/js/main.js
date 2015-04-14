import m from "mithril";


class Todo {
    constructor(data) {
        this.description = m.prop(data.description);
        this.done = m.prop(false);
    }
}

class TodoViewModel {
    constructor() {
        this.todos = [];

        //a slot to store the name of a new TodoItem before it is created
        this.descriptionInput = m.prop("");

        // We auto-bind methods to be invoked from event handlers; That's JavaScript for you!
        // TODO: We could always introduce a base class like https://github.com/SimonDegraeve/react-class-helper
        this.add = this.add.bind(this); // woohoo!
    }

    //adds a TodoItem to the list, and clears the description field for user convenience
    add() {
        if (this.descriptionInput()) {
            this.todos.push(new Todo({description: this.descriptionInput()}));
            this.descriptionInput("");
        }
    }
}

// for now, we're not introducing a "Controller" (just a ViewModel)
function todoView(viewModel) {
    return m("div", [
        // binding: onchange, invoke "descriptionInput(arg)" with arg = e.target.value (where e is the event object)
        m("input", {onchange: m.withAttr("value", viewModel.descriptionInput), value: viewModel.descriptionInput()}),
        // Note that "add" is auto-bound to the viewModel in the viewModel constructor
        m("button", {onclick: viewModel.add}, "Add"),
        m("table", [
            viewModel.todos.map(function (todo) {
                return m("tr", [
                    m("td", [
                        m("input[type=checkbox]", {onclick: m.withAttr("checked", todo.done), checked: todo.done()})
                    ]),
                    m("td", {style: {textDecoration: todo.done() ? "line-through" : "none"}}, todo.description())
                ]);
            })
        ])
    ]);
}

//m.render(document.getElementById("app"), view(viewModel));
m.module(document.getElementById("app"), {controller: TodoViewModel, view: todoView});