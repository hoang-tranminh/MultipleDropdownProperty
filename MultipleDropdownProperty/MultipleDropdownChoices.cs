using MultipleDropdownProperty.RestStore;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MultipleDropdownProperty
{
    /// <summary>
    /// Object to represent selected options of two dropdowns
    /// </summary>
    public class MultipleDropdownChoices
    {
        public ChoiceModel Choice1 { get; set; }

        public ChoiceModel Choice2 { get; set; }
    }
}