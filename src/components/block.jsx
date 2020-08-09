export default {
    props: {
        list: { type: Array, default: () => [] },
        title: { Type: String, required: true, default: () => 'Block Title' },
        subTitle: {
            Type: String,
            required: true,
            default: () => 'This is subtitle, short',
        },
        isTodo: { Type: Boolean, default: () => false },
        keyBlock: { Type: Number, required: true },
        labelTooltip: { Type: String, default: () => 'This label tooltip..' },
    },

    data() {
        return {
            ref: 'refDrop',
        };
    },

    beforeMount() {
        if (this.list.length) {
            this.ref = this.list[0].list;
        }
    },

    methods: {
        dragOver(event) {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
        },

        onDrop(event) {
            let iten = event.dataTransfer.getData('task');
            let dropped = Object.assign({}, JSON.parse(iten), {
                currentBlock: this.keyBlock,
            });
            this.$emit('dropItem', dropped);
        },

        dragStart(event, target) {
            // console.log('start ' + target.desc);
            let taskDrag = JSON.stringify({
                id: target.id,
                list: this.ref,
            });
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('task', taskDrag);
        },
    },

    render() {
        return (
            <article class="tile is-child box ">
                <p class="title has-text-black">{this.title}</p>
                <div class="level">
                    <div class="level-left">
                        <p class="subtitle has-text-black">{this.subTitle}</p>
                    </div>
                    <div class="level-right">
                        {this.isTodo ? (
                            <b-button
                                icon-left="plus-circle"
                                type="is-success"
                                onClick={() => console.log('handle modal')}
                            >
                                Add
                            </b-button>
                        ) : (
                            <b-tooltip
                                label={this.labelTooltip}
                                position="is-top"
                                animated
                            >
                                <b-icon icon="question-circle"></b-icon>
                            </b-tooltip>
                        )}
                    </div>
                </div>
                <div
                    class="content"
                    style={
                        !this.list.length
                            ? 'border:solid 1px #c3c3c3; border-radius: 5px; cursor: pointer;'
                            : ''
                    }
                    onDragover={(e) => this.dragOver(e)}
                    onDrop={(e) => this.onDrop(e)}
                >
                    {!this.list.length ? (
                        <div slot="empty">
                            <section class="section">
                                <div class="content has-text-grey has-text-centered">
                                    <p>
                                        <b-icon
                                            icon="frown"
                                            size="is-large"
                                        ></b-icon>
                                    </p>
                                    <p>Drag something here.</p>
                                </div>
                            </section>
                        </div>
                    ) : (
                        <ul style="list-style-type: none; margin: 0;">
                            {this.list.map((todo, index) => {
                                return (
                                    <li
                                        ref={this.ref}
                                        // onClick={(e) => console.log(e.target)}
                                        key={index}
                                        class={`box`}
                                        style={{
                                            padding: '0.7em',
                                        }}
                                        draggable={true}
                                        onDragstart={(e) =>
                                            this.dragStart(e, todo)
                                        }
                                    >
                                        <article
                                            class="media"
                                            style={{ height: '20px' }}
                                        >
                                            <div class="media-left">
                                                <b-icon
                                                    style={{ marginTop: '2px' }}
                                                    class="has-text-link"
                                                    icon="clock"
                                                    size="is-small"
                                                ></b-icon>
                                            </div>
                                            <div
                                                class="media-content"
                                                style={{ lineHeight: '10px' }}
                                            >
                                                <div class="content">
                                                    <span class="title is-6 has-text-dark">
                                                        {todo.desc}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="media-rigth">
                                                <span
                                                    onClick={() =>
                                                        console.log(
                                                            'handle delete'
                                                        )
                                                    }
                                                >
                                                    <b-icon
                                                        style={{
                                                            marginTop: '2px',
                                                        }}
                                                        class="has-text-danger"
                                                        icon="trash-alt"
                                                        size="is-small"
                                                    />
                                                </span>
                                            </div>
                                        </article>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </article>
        );
    },
};
