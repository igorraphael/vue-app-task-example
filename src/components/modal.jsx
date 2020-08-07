export default {
    computed: {
        hasError() {
            return this.description &&
                this.description.length > 1 &&
                this.description.length < 6
                ? 'is-danger'
                : '';
        },

        messageError() {
            return this.description &&
                this.description.length > 1 &&
                this.description.length < 6
                ? 'Description must have at least 5 characters'
                : '';
        },
    },

    methods: {
        handleMouseHover() {
            this.hover = !this.hover;
        },
        handleDelete(index) {
            // if (!index) return;
            this.confirmDelete(index);
        },

        handleSubmit() {
            if (!this.description || this.description.length < 6) {
                this.danger();
                return;
            }
            this.$emit('changes', this.description);
            this.handleModal();
        },

        confirmDelete(index) {
            this.$buefy.dialog.confirm({
                title: 'Deleting task',
                message:
                    'Are you sure you want to <b>delete</b> your task? This action cannot be undone.',
                confirmText: 'Delete Account',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => this.todos.splice(index, 1),
            });
        },

        danger() {
            const notif = this.$buefy.notification.open({
                message: `Please, enter the description..`,
                position: 'is-bottom-right',
                type: 'is-danger',
                hasIcon: true,
            });
        },
    },

    render() {
        return (
            <div>
                <div class={`modal ${this.modalVisible}`}>
                    <div class="modal-background"></div>
                    <div class="modal-card">
                        <section class="">
                            <div class="box" style={{ width: '500px' }}>
                                <div class="level">
                                    <div class="level-left">
                                        <p class="modal-card-title has-text-centered">
                                            Add new task
                                        </p>
                                    </div>
                                    <div class="level-right">
                                        <button
                                            style={
                                                this.hover === true
                                                    ? 'background-color: #7957d5'
                                                    : 'background-color: #ab8efa'
                                            }
                                            onMouseover={() =>
                                                this.handleMouseHover()
                                            }
                                            onMouseleave={() =>
                                                this.handleMouseHover()
                                            }
                                            class="delete"
                                            aria-label="close"
                                            onClick={() => this.handleModal()}
                                        ></button>
                                    </div>
                                </div>
                                <article class="media">
                                    <div class="media-content">
                                        <div
                                            class="content"
                                            style={{ marginTop: '1em' }}
                                        >
                                            <b-field
                                                message={this.messageError}
                                                type={this.hasError}
                                                label="Description"
                                                label-position="on-border"
                                                custom-class="has-text-primary"
                                            >
                                                <b-input
                                                    placeholder="Ex: Make a coffe"
                                                    v-model={this.description}
                                                ></b-input>
                                            </b-field>
                                        </div>
                                        <div class="has-text-centered">
                                            <b-button
                                                icon-left="save"
                                                type="is-success"
                                                onClick={() =>
                                                    this.handleSubmit()
                                                }
                                            >
                                                Save
                                            </b-button>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    },
};
