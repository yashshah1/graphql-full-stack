<form
    onSubmit={(e) => {
        e.preventDefault();
        let { name, genre, authorId } = this.state;
        this.setState({
            name: "",
            genre: "",
            authorId: ""
        });
    }}
>
    <div>
        <label>Book name:</label>
        <input
            type="text"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
        />
    </div>
    <div>
        <label>Genre:</label>
        <input
            type="text"
            value={this.state.genre}
            onChange={(e) => this.setState({ genre: e.target.value })}
        />
    </div>
    <div>
        <label>Author:</label>
        <select
            value={this.state.authorId}
            onChange={(e) => this.setState({ authorId: e.target.value })}
        >
            <option>Select author</option>
        </select>
    </div>
    <button>+</button>
</form>;
