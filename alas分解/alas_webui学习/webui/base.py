from pywebio.output import clear, put_html, put_scope, put_text, use_scope
from pywebio.session import defer_call, info, run_js


from utils import WebIOTaskHandler, Icon,filepath_css


class Base:
    def __init__(self) -> None:
        self.alive = True
        # Whether window is visible
        self.visible = True
        # Device type
        self.is_mobile = info.user_agent.is_mobile
        # Task handler
        self.task_handler = WebIOTaskHandler()
        defer_call(self.stop)

    def stop(self) -> None:
        self.alive = False
        self.task_handler.stop()


class Frame(Base):
    def __init__(self) -> None:
        super().__init__()
        self.page = "Home"

    @staticmethod
    @use_scope("ROOT", clear=True)
    def _show() -> None:
        put_scope(
            "header",
            [
                put_html(Icon.ALAS).style("--header-icon--"),
                put_text("Alas").style("--header-text--"),
                put_scope("header_status"),
                put_scope("header_title"),
            ],
        )
        put_scope(
            "contents",
            [
                put_scope("aside"),
                put_scope("menu"),
                put_scope("content"),
            ],
        )
# scope的上下文管理器和装饰器。用于创建一个新的输出域并进入，或进入一个已经存在的输出域。
# Scope支持嵌套。会话开始时，PyWebIO应用只有一个 ROOT scope。你可以在一个scope中创建新的scope。比如，以下代码将会创建3个scope:


if __name__ == '__main__':
    def add_css(filepath):
        with open(filepath, "r") as f:
            css = f.read().replace("\n", "")
            run_js(f"""$('head').append('<style>{css}</style>')""")
    add_css(filepath_css("alas"))
    Frame._show()
