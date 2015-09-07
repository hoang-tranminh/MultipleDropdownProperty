using EPiServer.Shell.ObjectEditing.EditorDescriptors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MultipleDropdownProperty
{
    [EditorDescriptorRegistration(
        EditorDescriptorBehavior= EditorDescriptorBehavior.Default, 
        TargetType= typeof(MultipleDropdownChoices),
        UIHint="Dropdowns")]
    public class MultipleDropdownEditorDescriptor: EditorDescriptor
    {
        public MultipleDropdownEditorDescriptor()
        {
            ClientEditingClass = "multipledropdownproperty.multipledropdown.editor";
        }

        protected override void SetEditorConfiguration(EPiServer.Shell.ObjectEditing.ExtendedMetadata metadata)
        {
            EditorConfiguration["apiGetChoices1"] = "http://something.net";
            EditorConfiguration["apiGetChoices2"] = "http://something.net";
            base.SetEditorConfiguration(metadata);
        }
    }
}
