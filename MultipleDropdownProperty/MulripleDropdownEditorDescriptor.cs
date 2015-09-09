using EPiServer.Shell.ObjectEditing.EditorDescriptors;

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
            ClientEditingClass = "multipledropdownproperty.scripts.editor";
        }

        protected override void SetEditorConfiguration(EPiServer.Shell.ObjectEditing.ExtendedMetadata metadata)
        {
            //we send some custom initialization parameters to our Dojo widget here!
            EditorConfiguration["choice1StoreName"] = "multipledropdownproperty.firstchoicedropdownreststore";
            EditorConfiguration["choice2StoreName"] = "multipledropdownproperty.secondchoicedropdownreststore";
            base.SetEditorConfiguration(metadata);
        }
    }
}
