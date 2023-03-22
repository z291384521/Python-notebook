using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using DSkin.Controls;

namespace TestForm
{
    public partial class Form2 : Form
    {
        public Form2()
        {
            InitializeComponent();
        }

        TableLayoutPanel table = new TableLayoutPanel();

        private void Form2_Load(object sender, EventArgs e)
        {
            // 默认添加一行数据
            table.Dock = DockStyle.Top;
            panel2.Controls.Add(table);
           // table.RowCount++;
            table.ColumnCount = 4;
            table.Height = table.RowCount * 40;
            int step = 100 / table.ColumnCount;

            table.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, step));
            table.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, step));
            table.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, step));
            table.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, step));

            for (int ii = 0; ii < table.RowCount; ii++)
            {
                table.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 40));
            }
        }

        /// <summary>
        /// 添加一行
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button1_Click(object sender, EventArgs e)
        {
            // 动态添加一行
            table.RowCount++;
            //设置高度
            table.Height = table.RowCount * 40;
            // 行高
            table.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 40));
            // 设置cell样式，
            table.CellBorderStyle = TableLayoutPanelCellBorderStyle.Single;

            int i = table.RowCount - 1;
            // 添加控件
            CheckBox p = new CheckBox();
            p.Anchor = AnchorStyles.None;
            p.TextAlign = ContentAlignment.MiddleCenter;
            table.Controls.Add(p, 0, table.RowCount-1);
            p.Text = "" + i; ;


            TextBox name = new TextBox();
            name.Text = "name-"+i;
            name.Anchor = AnchorStyles.Left | AnchorStyles.Right;
            name.TextAlign = HorizontalAlignment.Center;
            table.Controls.Add(name, 1, i);

            TextBox inc = new TextBox();
            inc.Anchor = AnchorStyles.Left | AnchorStyles.Right;
            inc.TextAlign = HorizontalAlignment.Center;
            inc.Text = "in-" + i;
            table.Controls.Add(inc, 2, i);

            TextBox outc = new TextBox();
            outc.Anchor = AnchorStyles.Left | AnchorStyles.Right;
            outc.TextAlign = HorizontalAlignment.Center;
            outc.Text = "out-" + i;
            table.Controls.Add(outc, 3, i);

        }

        /// <summary>
        /// 删除一行
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button2_Click(object sender, EventArgs e)
        {

            // 行数
            int row = 0;

            for (int i = 0; i < table.Controls.Count; i++)
            {
                  Control ctl = table.Controls[i];
                  // 默认CheckBox为行首控件
                  if (ctl.GetType().ToString().Contains("CheckBox"))
                  {
                       CheckBox rb = (CheckBox)ctl;
                       if (rb.Checked)
                       {
                           // 删除当前行的所有控件
                           for (int j = 0; j < table.ColumnCount;j++ ) 
                           {
                               table.Controls.RemoveAt(i);
                           }

                           // 移动,当前行row的下行往上移动
                           for (int k = row; k < table.RowCount-1;k++ )
                           {
                               Control ctlNext = table.GetControlFromPosition(0, k + 1);
                               table.SetCellPosition(ctlNext, new TableLayoutPanelCellPosition(0, k));
                               Control ctlNext1 = table.GetControlFromPosition(1, k + 1);
                               table.SetCellPosition(ctlNext1, new TableLayoutPanelCellPosition(1, k));
                               Control ctlNext2 = table.GetControlFromPosition(2, k + 1);
                               table.SetCellPosition(ctlNext2, new TableLayoutPanelCellPosition(2, k));
                               Control ctlNext3 = table.GetControlFromPosition(3, k + 1);
                               table.SetCellPosition(ctlNext3, new TableLayoutPanelCellPosition(3, k));
                            }

                           //移除最后一行，最后为空白行
                           table.RowStyles.RemoveAt(table.RowCount - 1);
                           table.RowCount = table.RowCount - 1;
                           break;
                       }
                       row++;//行数加加
                   }
            }

            // 重新计算高度，否则最后一行偏大
            table.Height = table.RowCount * 40;
        }
    }
}