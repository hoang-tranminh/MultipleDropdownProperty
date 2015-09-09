using EPiServer.Core;
using EPiServer.PlugIn;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MultipleDropdownProperty
{
    [PropertyDefinitionTypePlugIn(
        DisplayName="Multiple dropdown", 
        Description="Show multiple dropdowns, values in second dropdown are dependent on selected values in first dropdown.")]
    public class MultipleDropDownProperty: PropertyLongString
    {
        /// <summary>
        /// Return MultipleDropdownChoices type to application code
        /// </summary>
        public override Type PropertyValueType
        {
            get
            {
                return typeof(MultipleDropdownChoices);
            }
        }

        /// <summary>
        /// Internally, we use Json to serialize & deserialize MultipleDropdownChoices value object to & from string
        /// </summary>
        public override object Value
        {
            get
            {
                var value = base.Value as string;
                if (value == null)
                {
                    return null;
                }
                return JsonConvert.DeserializeObject<MultipleDropdownChoices>(value);
            }
            set
            {
                if (value is MultipleDropdownChoices)
                {
                    base.Value = JsonConvert.SerializeObject(value);
                }
                else
                {
                    base.Value = value;
                }
            }
        }

        public override object SaveData(PropertyDataCollection properties)
        {
            //return a string object so that EPi can save it to database
            return LongString;
        }
    }
}
