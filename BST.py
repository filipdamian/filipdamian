import sys
class node:
    def __init__(self,val=None):
        self.val=val
        self.child_left=None
        self.child_right=None
        self.parent=None

class BST:
    def __init__(self):
        self.root=None
    def insert(self,val):
        if self.root==None:
            self.root=node(val)
        else:
            self.insert1(val,self.root)
    def insert1(self,val,current_node):
        if val<current_node.val:
            if current_node.child_left==None:
                current_node.child_left=node(val)
                current_node.child_left.parent=current_node

            else:
                self.insert1(val,current_node.child_left)
        if val>current_node.val:
            if current_node.child_right==None:
                current_node.child_right=node(val)
                current_node.child_right.parent=current_node
            else:
                self.insert1(val,current_node.child_right)
        if val==current_node:
            print("Nu pot exista duplicate-uri intr-o multime")
    def afis(self):
        if self.root!=None:
            self.afis1(self.root)
    def afis1(self,current_node):

        if current_node!=None:
            self.afis1(current_node.child_left)
            print(current_node.val)
            self.afis1(current_node.child_right)
    def este_in(self,val):
        if self.root!=None:
            return self.search(val,self.root)
        else:
            return False
    def search(self,val,current_node):
        if val== current_node.val:
            #print(current_node) <---address of node
            return True
        elif val<current_node.val and current_node.child_left!=None:
           return self.search(val,current_node.child_left)
        elif val>current_node.val and current_node.child_right!=None:
           return self.search(val,current_node.child_right)
        return False
    def find(self,val):
        if self.root==None:
            return None
        else:
            return self.find1(val,self.root)
    def find1(self,val,current_node):
        if val==current_node.val:
            return current_node
        elif val<current_node.val and current_node.child_left!=None:
            return self.find1(val,current_node.child_left)
        elif val>current_node.val and current_node.child_right!=None:
            return self.find1(val,current_node.child_right)
    def delete_val(self,val):
        return self.delete_node(self.find(val))

    def delete_node(self,node):
        if node == None or self.find(node.val) == None:
            print("Nodul nu a fost introdus anterior in arbore")
            return None
        def mini(n):
            current=n
            while current.child_left!=None:
                current=current.child_left
            print("!!",current)
            return current

        def num_children(n):
            num_children=0
            if n.child_left!=None:
                num_children+=1
            if n.child_right!=None:
                num_children+=1
            return num_children


        node_parent=node.parent
        node_children=num_children(node)
        #caz1 !!
        if node_children==0:
            if node_parent != None:
                if node_parent.child_left==node: #daca nodul curent e egal cu nodul care se vrea a fi sters
                    node_parent.child_left=None # atunci referinta nodului curent devine none
                else:
                    node_parent.child_right=None
            else:
                self.root=None

        #caz2 !!
        if node_children==1:
            if node.child_left!=None:   #stabilim copilul
                child=node.child_left
            else:
                child=node.child_right
            if node_parent!=None:
                if node_parent.child_left==node: #daca nodul curent e egal cu nodul care se vrea a fi sters
                    node_parent.child_left=child #atunci nodul este inlocuit cu copilul sau (avand doar unul)
                else:
                    node_parent.child_right=child #atunci nodul este inlocuit cu copilul sau (avand doar unul)
            else:
                self.root=child
            child.parent=node_parent
        #caz3 !!
        if node_children == 2:
            successor=mini(node.child_right)
            node.val=successor.val
            self.delete_node(successor)
    def min(self):
        return self.minim(self.root)
    def minim(self,current_node):
        #pornesc de la root
        if current_node.child_left==None:
            print("@@",current_node.val)
            return current_node.val
        else:
            return self.minim(current_node.child_left)
    def max(self):
        return self.maxim(self.root)
    def maxim(self,current_node):
        if current_node.child_right==None:
            print("$$",current_node.val)
            return current_node.val
        else:
            return self.maxim(current_node.child_right)
    def succesor(self,val):
        m=self.max()
        f=self.este_in(val)
        if f is True:
            return self.suc1(self.find(val),self.root,m)
    def suc1(self,node,current_node,m):
        stack=[]
        aux1=sys.maxsize
        s=current_node
        while True:
            if current_node is not None:
                stack.append(current_node)
                current_node=current_node.child_left
            elif(stack):
                current_node=stack.pop()
                if current_node.val>node.val:
                    aux=abs(node.val-current_node.val)
                    if aux<aux1:
                        aux1=aux
                        s=current_node.val
                current_node=current_node.child_right
            else:
                break
        if m is node.val:
            return node.val # return False (in cazul in care nu se pune ca successor pentru sine)
        return s
    def predecesor(self,val):
        n=self.min()
        f=self.este_in(val)
        if f is True:
            return self.pred1(self.find(val),self.root,n)
    def pred1(self,node,current_node,n):
        stack=[]
        aux1=sys.maxsize
        p=current_node
        while True:
            if current_node is not None:
                stack.append(current_node)
                current_node=current_node.child_left
            elif(stack):
                current_node=stack.pop()
                if current_node.val<node.val:
                    aux=abs(node.val-current_node.val)
                    if aux<aux1:
                        aux1=aux
                        p=current_node.val
                current_node=current_node.child_right
            else:
                break
        if n is node.val:
            return node.val # return False (in cazul in care nu se pune ca successor pentru sine)
        return p




tree=BST()
tree.insert(5)
tree.insert(4)
tree.insert(6)
tree.insert(35)
tree.insert(53)
print(tree.succesor(5))
print(tree.predecesor(0))
"""print(tree.este_in(1))
tree.afis()
tree.max()
tree.delete_val(1)
tree.delete_val(52)
tree.afis()
tree.max()
tree.min()
tree.afis()
tree.delete_val(5)
tree.delete_val(45)
tree.afis()
tree.max()
tree.min()
tree.delete_val(15)
tree.afis()
tree.max()
tree.min()
#print("!!!!!!!",tree.min())"""





